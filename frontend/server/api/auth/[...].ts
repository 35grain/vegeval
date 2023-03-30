import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
const config = useRuntimeConfig()

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token
            }
            return token
        },
        session({ session, token }) {
            session.access_token = token.access_token
            return session
        },
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

                if (response.access_token) {
                    console.log(response.token);
                    return { access_token: response.access_token};
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1h
    },
    pages: {
        signIn: '/login'
    }
})
