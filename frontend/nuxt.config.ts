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
        public: {
            apiUrl: process.env.BASE_URL_SERVER
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
        enableSessionRefreshOnWindowFocus: true,
    },
    tailwindcss: {
        cssPath: '~/assets/styles/main.scss'
    }
})