import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
const config = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return user;
            } else if (token.expires_at && (token.expires_at - 5 * 60) * 1000 > Date.now()) { // up to 5 minutes before expiration
                return token
            } else if (token.refresh_token) {
                try {
                    const response: any = await $fetch(`${config.public.apiUrl}/auth/token`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token.refresh_token}`
                        },
                    });
                    if (response) {
                        const user = JSON.parse(Buffer.from(response.access_token.split('.')[1], 'base64').toString());
                        return {
                            id: user.sub,
                            email: user.email,
                            role: user.role,
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
        async session({ session, token }) {
            return {
                ...session,
                id: token.id,
                email: token.email,
                role: token.role,
                access_token: token.access_token,
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
                    `${config.public.apiUrl}/auth/login`,
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
                        role: data.role,
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
        maxAge: 60 * 60 * 24, // 24 hours
    },
    pages: {
        signIn: '/login'
    }
})
