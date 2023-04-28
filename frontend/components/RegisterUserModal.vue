<template>
    <div>
        <input type="checkbox" id="new-user-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Add a new user</h1>
                </div>
                <Alert :alert="user.alert" />
                <form @submit.prevent="registrationHandler">
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="john@deere.com"
                                    class="input input-bordered w-full max-w-xs" v-model="user.email" required />
                            </div>
                        </div>
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" class="input input-bordered w-full max-w-xs" v-model="user.password"
                                    required minlength="16" />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <button class="btn btn-primary" type="submit">Add</button>
                        <label for="new-user-modal" class="btn btn-error">Cancel</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    setup: () => {
        const session = useSession();
        const config = useRuntimeConfig();
        return { session, config };
    },
    props: ['models'],
    data: () => ({
        user: {
            email: undefined,
            password: undefined,
            alert: {
                message: undefined,
                error: false
            }
        }
    }),
    methods: {
        async registrationHandler() {
            const { data, error } = await useFetch(`${this.config.public.apiUrl}/users/register`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.session.data.value?.access_token}`,
                    },
                    body: JSON.stringify({
                        email: this.user.email,
                        password: this.user.password
                    }),
                });

            if (!error.value) {
                this.user.alert.error = false;
                this.user.alert.message = data.value?.message;
                refreshNuxtData();
            } else {
                this.user.alert.error = true;
                this.user.alert.message = error.value.data?.message;
                if (error.value.status === 403) {
                    this.session.signOut({ redirect: true, callbackUrl: '/login' });
                }
            }
        }
    }
}
</script>