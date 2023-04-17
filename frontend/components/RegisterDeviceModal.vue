<template>
    <div>
        <input type="checkbox" id="new-device-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Register a new device</h1>
                    <small>New devices will be assigned a unique API key after registration.</small>
                </div>
                <Alert :alert="device.alert" />
                <form @submit.prevent="registrationHandler">
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Device label</span>
                                </label>
                                <input type="text" placeholder="Device 1" class="input input-bordered w-full max-w-xs"
                                    v-model="device.label" required />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Evaluation model</span>
                                </label>
                                <select class="select select-bordered" v-model="device.model" required>
                                    <option disabled selected value="default">Select one</option>
                                    <option v-for="model in models" :key="model.id" :value="model.id">
                                        {{ model.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Device IP</span>
                                </label>
                                <input type="text" placeholder="0.0.0.0" class="input input-bordered w-full max-w-xs"
                                    v-model="device.ip" required />
                                <label class="label">
                                    <span class="label-text">Only connections from the specified IP will be allowed</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <button class="btn btn-primary" type="submit">Register</button>
                        <label for="new-device-modal" class="btn btn-error">Cancel</label>
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
        device: {
            label: undefined,
            model: 'default',
            ip: undefined,
            alert: {
                message: undefined,
                error: false
            }
        }
    }),
    methods: {
        async registrationHandler() {
            const { data, error } = await useFetch(`${this.config.public.apiUrl}/devices/register`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.session.data.value?.access_token}`,
                    },
                    body: JSON.stringify({
                        label: this.device.label,
                        model: Number(this.device.model),
                        ip: this.device.ip,
                    }),
                });

            if (!error.value) {
                this.device.alert.error = false;
                this.device.alert.message = data.value?.message;
                refreshNuxtData();
            } else {
                this.device.alert.error = true;
                this.device.alert.message = error.value.data?.message;
                if (error.value.status === 403) {
                    this.session.signOut({ redirect: true, callbackUrl: '/login' });
                }
            }
        }
    }
}
</script>