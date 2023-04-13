<script setup lang="ts">
const { signIn, status } = useSession()

useHead({
    title: "Login",
});

if (status.value === 'authenticated' ) {
    navigateTo('/dashboard');
}

let login: { username: string, password: string, alert: { message: string | undefined, error: boolean}} = reactive({
    username: "",
    password: "",
    alert: {
        message: undefined,
        error: false
    }
});

const signInHandler = async () => {
    const username = login.username;
    const password = login.password;

    if (username && password) {
        const { error, url } = await signIn('credentials-login', { callbackUrl: '/dashboard', username, password, redirect: false })

        if (error) {
            login.alert.error = true;
            login.alert.message = "Username or password incorrect. Please try again!";
        } else {
            login.alert.error = false;
            login.alert.message = "Successfully logged in!";
            return navigateTo(url, { external: true });
        }
    } else {
        login.alert.error = true;
        login.alert.message = "Username and password are required!";
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
                        <Alert :alert="login.alert" />
                        <div class="form-control w-full max-w-xs">
                            <label class="label" for="emailInput">
                                <span class="label-text">E-mail</span>
                            </label>
                            <input id="emailInput" type="email" placeholder="john@deere.com" v-model="login.username"
                                class="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label" for="passwordInput">
                                <span class="label-text">Password</span>
                            </label>
                            <input id="passwordInput" type="password" v-model="login.password"
                                class="input input-bordered w-full max-w-xs" required />
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