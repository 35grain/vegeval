<template>
    <div>
        <input type="checkbox" id="new-model-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Register a new model</h1>
                </div>
                <Alert :alert="model.alert" />
                <form @submit.prevent="registrationHandler">
                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Model name</span>
                                </label>
                                <input type="text" placeholder="Potato model" class="input input-bordered w-full max-w-xs"
                                    v-model="model.name" required />
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Model version</span>
                                </label>
                                <input type="text" placeholder="1.0.0" class="input input-bordered w-full max-w-xs"
                                    v-model="model.version" required />
                            </div>
                        </div>
                        <div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Add model file</span>
                                </label>
                                <input type="file" class="file-input file-input-bordered w-full max-w-xs" @change="handleFileUpload" required />
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <button class="btn btn-primary" type="submit">Register</button>
                        <label for="new-model-modal" class="btn btn-error">Cancel</label>
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
    data: () => ({
        model: {
            name: "",
            version: "",
            url: "",
            file: "",
            alert: {
                message: "",
                error: false
            }
        }
    }),
    methods: {
        async clearModal() {
            this.model.name = "";
            this.model.version = "";
            this.model.file = "";
            this.model.alert.message = "";
            this.model.alert.error = false;
        },
        async handleFileUpload(event: Event) {
            this.model.file = event.target.files[0];
        },
        async registrationHandler() {
            const formData = new FormData();
            formData.append("file", this.model.file);
            formData.append("name", this.model.name);
            formData.append("version", this.model.version);

            const { error } = await useFetch(`${this.config.public.apiUrl}/models/register`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.session.data.value?.access_token}`,
                    },
                    body: formData
                });

            if (!error.value) {
                this.model.alert.error = false;
                this.model.alert.message = "Model registered successfully!";
                refreshNuxtData();
                document.querySelector("input#new-model-modal").checked = false;
                this.clearModal();
            } else {
                this.model.alert.error = true;
                this.model.alert.message = error.value.data?.message;
                if (error.value.status === 403) {
                    this.session.signOut({ redirect: true, callbackUrl: '/login' });
                }
            }
        }
    }
}
</script>