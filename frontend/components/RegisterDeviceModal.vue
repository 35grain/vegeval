<template>
    <div>
        <input type="checkbox" id="new-device-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Register a new edge device</h1>
                    <small>New devices will be assigned a unique Access Key and Secret Key after registration.</small>
                </div>
                <Alert :alert="device.alert" />
                <form @submit.prevent="registrationHandler">
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">User</span>
                                </label>
                                <select class="select select-bordered" v-model="device.user" required>
                                    <option disabled selected value="default">Select one</option>
                                    <option v-for="user in clients" :key="user.id" :value="user.id">
                                        {{ user.email }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Evaluation module</span>
                                </label>
                                <select class="select select-bordered" v-model="device.model" required>
                                    <option disabled selected value="default">Select one</option>
                                    <option v-for="model in models" :key="model.id" :value="model.id">
                                        {{ model.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <span class="label-text me-1">Upload raw images to Minio S3 bucket</span>
                                    <input type="checkbox" class="toggle toggle-primary" v-model="device.uploadRaw"/>
                                </label>
                            </div>
                        </div>
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
                                    <span class="label-text">Device IP</span>
                                </label>
                                <input type="text" placeholder="0.0.0.0" class="input input-bordered w-full max-w-xs"
                                    v-model="device.ip" required />
                                <label class="label">
                                    <span class="label-text">Only connections from the specified IP will be allowed</span>
                                </label>
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Device port</span>
                                </label>
                                <input type="text" placeholder="20048" min="1024" max="65535" class="input input-bordered w-full max-w-xs"
                                    v-model="device.port" required />
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
                    <h1 class="mb-0">New device: {{ device.label }}</h1>
                    <small>Please note down the gRPC Secret Key as it will not be shown again!</small>
                </div>
                <div>
                    <div class="form-control w-full" v-if="device.bucketName">
                        <label class="label">
                            <span class="label-text">MinIO S3 storage bucket</span>
                        </label>
                        <div class="tooltip" data-tip="Copy name">
                            <input type="text" readonly class="input input-bordered w-full cursor-pointer"
                                @click="copyInputValue" v-model="device.bucketName" />
                        </div>
                    </div>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">gRPC Access Key</span>
                        </label>
                        <div class="tooltip" data-tip="Copy key">
                            <input type="text" readonly class="input input-bordered w-full cursor-pointer"
                                @click="copyInputValue" v-model="device.apiKey" />
                        </div>
                    </div>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">gRPC Secret Key</span>
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
            user: "default",
            label: "",
            model: "default",
            ip: "",
            port: "",
            uploadRaw: false,
            bucketName: "",
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
            this.device.user = "";
            this.device.label = "";
            this.device.model = "default";
            this.device.ip = "";
            this.device.port = "";
            this.device.uploadRaw = false;
            this.device.bucketName = "";
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
                        client: this.device.user,
                        label: this.device.label,
                        model: this.device.model,
                        ip: this.device.ip,
                        port: this.device.port,
                        uploadRaw: this.device.uploadRaw
                    })
                });

            if (!error.value) {
                this.device.alert.error = false;
                this.device.alert.message = "Device registered successfully!";
                if (data.value.bucketName) {
                    this.device.bucketName = data.value.bucketName;
                }
                this.device.apiKey = data.value.apiKey;
                this.device.secretKey = data.value.secretKey;
                document.querySelector("input#new-device-modal").checked = false;
                document.querySelector("input#device-credentials-modal").checked = true;
                refreshNuxtData('devices');
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