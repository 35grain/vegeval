<script setup lang="ts">
const { data } = useSession()
definePageMeta({
    middleware: ['auth']
});
useHead({
    title: "Profile",
});

let update: { password: string, passwordConfirm: string, message: string | undefined, error: boolean} = reactive({
    password: "",
    passwordConfirm: "",
    message: undefined,
    error: false
});

const updateHandler = async () => {
    update.message = "";
    update.error = false;
    const { data, error } = await useFetch('/api/update-profile',
        {
            method: "POST",
            body: JSON.stringify({
                password: update.password,
                passwordConfirm: update.passwordConfirm,
            }),
        });

    if (!error.value) {
            update.error = false;
            update.message = data.value?.statusMessage;
    } else {
        update.error = true;
        update.message = error.value.statusMessage;
    }
};
</script>

<template>
    <main class="md:container md:mx-auto">
        <div class="my-16">
            <div class="prose prose-slate text-left mb-12">
                <h1>Profile</h1>
            </div>
            <div class="card glass mx-auto">
                <div class="card-body">
                    <form @submit.prevent="updateHandler">
                        <div class="alert shadow-lg mb-4" :class="{ 'alert-error': update.error, 'alert-success': !update.error }" v-if="update.message">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{{ update.message }}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-8">
                            <div>
                                <div class="form-control w-full">
                                    <label class="label" for="email">
                                        <span class="label-text">Email</span>
                                    </label>
                                    <input id="email" name="email" type="text" placeholder="john@deere.com"
                                        v-bind:value="data?.email" class="input input-bordered w-full" disabled />
                                </div>
                            </div>
                            <div>
                                <div class="form-control w-full">
                                    <label class="label" for="password">
                                        <span class="label-text">New password</span>
                                    </label>
                                    <input id="passowrd" name="password" type="password" class="input input-bordered w-full"
                                        v-model="update.password" />
                                </div>
                                <div class="form-control w-full">
                                    <label class="label" for="password-confirm">
                                        <span class="label-text">Confirm password</span>
                                    </label>
                                    <input id="passowrd-confirm" name="password-confirm" type="password"
                                        class="input input-bordered w-full" v-model="update.passwordConfirm" />
                                </div>
                            </div>
                        </div>
                        <div class="card-actions mt-2">
                            <button class="btn btn-primary" type="submit">
                                <Icon name="ic:outline-save" class="w-5 h-5 me-1" />
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>