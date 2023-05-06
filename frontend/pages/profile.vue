<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
});
useHead({
    title: "Profile",
});
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
                                    <input id="email" name="email" type="email" placeholder="john@deere.com"
                                        v-model="update.email" class="input input-bordered w-full" />
                                </div>
                                <div class="form-control w-full">
                                    <label class="label" for="password">
                                        <span class="label-text">Current password</span>
                                    </label>
                                    <input id="passowrd" name="password" type="password" class="input input-bordered w-full"
                                        v-model="update.password" />
                                </div>
                            </div>
                            <div>
                                <div class="form-control w-full">
                                    <label class="label" for="new-password">
                                        <span class="label-text">New password</span>
                                    </label>
                                    <input id="new-passowrd" name="new-password" type="password" class="input input-bordered w-full"
                                        v-model="update.newPassword" />
                                </div>
                                <div class="form-control w-full">
                                    <label class="label" for="new-password-confirm">
                                        <span class="label-text">Confirm new password</span>
                                    </label>
                                    <input id="new-passowrd-confirm" name="new-password-confirm" type="password"
                                        class="input input-bordered w-full" v-model="update.newPasswordConfirm" />
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
<script lang="ts">
export default {
    data: () => ({
        update: {
            email: useSession().data.value?.user?.email,
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
            alert: {
                message: "" as string | undefined,
                error: false
            }
        }
    }),
    methods: {
        async updateHandler() {
            const session = useSession();
            const config = useRuntimeConfig();
            if (this.update.newPassword !== this.update.newPasswordConfirm) {
                this.update.alert.error = true;
                this.update.alert.message = "Passwords do not match";
                return;
            } else {
                const { data, error } = await useFetch(`${config.public.apiUrl}/users/update`,
                    {
                        headers: {
                            'Authorization': `Bearer ${session.data.value?.access_token}`
                        },
                        method: "POST",
                        body: JSON.stringify({
                            id: session.data.value?.user?.id,
                            password: this.update.password,
                            ...(this.update.email && {email: this.update.email}),
                            ...(this.update.newPassword && {newPassword: this.update.newPassword}),
                            ...(this.update.newPasswordConfirm && {newPasswordConfirm: this.update.newPasswordConfirm}),
                        }),
                    });

                if (!error.value) {
                    this.update.alert.error = false;
                    this.update.alert.message = "Profile updated. Signing out!";
                    session.signOut({ redirect: true, callbackUrl: '/login' });
                } else {
                    this.update.alert.error = true;
                    this.update.alert.message = error.value?.data.message;
                    if (error.value.status === 403) {
                        session.signOut({ redirect: true, callbackUrl: '/login' });
                    }
                }
            }
        }
    }
}
</script>