<script setup lang="ts">
const { signIn } = useSession()

useHead({
    title: "Login",
});

let login: { username: string, password: string, error: null | string } = reactive({
    username: "",
    password: "",
    error: null
});

const signInHandler = async () => {
    const username = login.username;
    const password = login.password;

    if (username && password) {
        const { error, url } = await signIn('credentials-login', { callbackUrl: '/dashboard', username, password, redirect: false })

        if (error) {
            login.error = "Username or password incorrect. Please try again!";
        } else {
            return navigateTo(url, { external: true });
        }
    } else {
        login.error = "Username and password are required!";
    }
};
</script>

<template>
    <main class="md:container md:mx-auto">
        <div class="my-32">
            <div class="prose prose-slate mx-auto text-center mb-12">
                <h1>Login</h1>
            </div>
            <div class="card w-96 glass mx-auto">
                <div class="card-body">
                    <form @submit.prevent="signInHandler">
                        <div class="alert alert-error shadow-lg" v-if="login.error">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{{ login.error }}</span>
                            </div>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label" for="emailInput">
                                <span class="label-text">E-mail</span>
                            </label>
                            <input id="emailInput" type="email" placeholder="john@deere.com" v-model="login.username"
                                class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label" for="passwordInput">
                                <span class="label-text">Password</span>
                            </label>
                            <input id="passwordInput" type="password" v-model="login.password"
                                class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="card-actions justify-between mt-2">
                            <div class="tooltip" data-tip="Registration is not available to the public">
                                <a class="btn btn-outline btn-disabled" tabindex="-1" aria-disabled="true">Register</a>
                            </div>
                            <button class="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>