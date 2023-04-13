<script setup lang="ts">
const { data, signOut } = useSession()
definePageMeta({
    middleware: ['auth']
});
useHead({
    title: "Profile",
});

let update: { password: string, passwordConfirm: string, alert: { message: string | undefined, error: boolean } } = reactive({
    password: "",
    passwordConfirm: "",
    alert: {
        message: undefined,
        error: false
    }
});

const updateHandler = async () => {
    const { data, error } = await useFetch('/api/update-profile',
        {
            method: "POST",
            body: JSON.stringify({
                password: update.password,
                passwordConfirm: update.passwordConfirm,
            }),
        });

    if (!error.value) {
        update.alert.error = false;
        update.alert.message = data.value?.statusMessage;
        refreshNuxtData();
    } else {
        update.alert.error = true;
        update.alert.message = error.value.statusMessage;
        if (error.value.status === 403) {
            signOut({ redirect: true, callbackUrl: '/login' });
        }
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
                        <Alert :alert="update.alert" />
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