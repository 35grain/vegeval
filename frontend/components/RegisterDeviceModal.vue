<template>
    <div>
        <input type="checkbox" id="new-device-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Register a new device</h1>
                    <small>New devices will be assigned a unique API key and secret after registration.</small>
                </div>
                <Alert :alert="device.alert" />
                <form @submit.prevent="registrationHandler">
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Client</span>
                                </label>
                                <select class="select select-bordered" v-model="device.client" required>
                                    <option disabled selected value="default">Select one</option>
                                    <option v-for="client in clients" :key="client.id" :value="client.id">
                                        {{ client.email }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Device label</span>
                                </label>
                                <input type="text" placeholder="Device 1" class="input input-bordered w-full max-w-xs"
                                    v-model="device.label" required />
                            </div>
                        </div>
                        <div>
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
        <input type="checkbox" id="device-credentials-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">{{ device.label }}</h1>
                    <small>Please note down the secret key as it will not be shown again!</small>
                </div>
                <div>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">API key</span>
                        </label>
                        <div class="tooltip" data-tip="Copy key">
                            <input type="text" readonly class="input input-bordered w-full cursor-pointer"
                                @click="copyInputValue" v-model="device.apiKey" />
                        </div>
                    </div>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Secret key</span>
                        </label>
                        <div class="tooltip" data-tip="Copy key">
                            <input type="text" readonly class="input input-bordered w-full cursor-pointer"
                                @click="copyInputValue" v-model="device.secretKey" />
                        </div>
                    </div>
                    <div class="flex justify-center mt-6">
                        <label for="device-credentials-modal" @click="clearModal" class="btn btn-error">I have copied
                            the secret key to a secure location</label>
                    </div>
                </div>
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
    props: ["clients", "models"],
    data: () => ({
        device: {
            client: "default",
            label: "",
            model: "default",
            ip: "",
            apiKey: "",
            secretKey: "",
            alert: {
                message: "",
                error: false
            }
        }
    }),
    methods: {
        copyInputValue(e: MouseEvent) {
            const input = e.target as HTMLInputElement;
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value);
        },
        async clearModal() {
            this.device.client = "";
            this.device.label = "";
            this.device.model = "default";
            this.device.ip = "";
            this.device.apiKey = "";
            this.device.secretKey = "";
            this.device.alert.message = "";
            this.device.alert.error = false;
        },
        async registrationHandler() {
            const { data, error } = await useFetch(`${this.config.public.apiUrl}/devices/register`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.session.data.value?.access_token}`,
                    },
                    body: JSON.stringify({
                        client: this.device.client,
                        label: this.device.label,
                        model: this.device.model,
                        ip: this.device.ip,
                    }),
                });

            if (!error.value) {
                this.device.alert.error = false;
                this.device.alert.message = "Device registered successfully!";
                this.device.apiKey = data.value.apiKey;
                this.device.secretKey = data.value.secretKey;
                document.querySelector("input#new-device-modal").checked = false;
                document.querySelector("input#device-credentials-modal").checked = true;
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