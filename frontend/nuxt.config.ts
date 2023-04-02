export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            }
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    runtimeConfig: {
        baseUrl: process.env.BASE_URL_SERVER,
        public: {
            baseUrl: process.env.BASE_URL_CLIENT
        },
        authSecret: process.env.AUTH_SECRET
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
        'nuxt-icon'
    ],
    auth: {
        origin: process.env.BASE_URL_CLIENT,
    },
    tailwindcss: {
        cssPath: '~/assets/styles/main.scss'
    }
})