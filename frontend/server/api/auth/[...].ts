import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    id: (user as any).id,
                    email: (user as any).email,
                    expires_at: (user as any).expires_at,
                    access_token: (user as any).access_token,
                    refresh_token: (user as any).refresh_token,
                    error: undefined
                }
            } else if (Date.now() < (token.expires_at - 60 * 5) * 1000) {
                return token
            } else if (token.refresh_token) {
                try {
                    const response: any = await $fetch(`${config.baseUrl}/auth/token?id=${token.id}&refresh_token=${token.refresh_token}`);
                    if (response) {
                        const expires_at = JSON.parse(Buffer.from(response.access_token.split('.')[1], 'base64').toString()).exp;
                        return {
                            ...token,
                            expires_at: expires_at,
                            access_token: response.access_token,
                            refresh_token: response.refresh_token ?? token.refresh_token, // Fallback to old refresh token although likely invoked
                            error: undefined
                        };
                    }
                } catch (error) {
                    return { ...token, error: "RefreshTokenError" };
                }
            } return null;
        },
        session({ session, token }) {
            return {
                ...session,
                id: token.id,
                email: token.email
            }
        }
    },
    providers: [
        CredentialsProvider.default({
            id: "credentials-login",
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any) {
                const response: any = await $fetch(
                    `${config.baseUrl}/auth/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password,
                        }),
                    });

                if (response) {
                    const data = JSON.parse(Buffer.from(response.access_token.split('.')[1], 'base64').toString());
                    return {
                        id: data.sub,
                        email: data.email,
                        expires_at: data.exp,
                        access_token: response.access_token,
                        refresh_token: response.refresh_token
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 15, // 15 min
    },
    pages: {
        signIn: '/login'
    }
})
