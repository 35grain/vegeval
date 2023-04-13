<script setup lang="ts">
const session: any = useSession()
const config = useRuntimeConfig()

let device: { id: number | undefined, label: string | undefined, model: string | undefined, ip: string | undefined, alert: { message: string | undefined, error: boolean } } = reactive({
    id: undefined,
    label: undefined,
    model: 'default',
    ip: undefined,
    alert: {
        message: undefined,
        error: false
    }
});
</script>

<template>
    <div>
        <input type="checkbox" id="edit-device-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-7/12 max-w-2xl">
                <div class="prose prose-slate text-left mb-6">
                    <h1 class="mb-0">Edit device</h1>
                </div>
                <Alert :alert="device.alert" />
                <form @submit.prevent="updateHandler">
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
                        <label for="edit-device-modal" class="btn btn-error">Cancel</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ['device', 'models'],
    methods: {
        async updateHandler() {
            const { data, error } = await useFetch(`${config.public.apiUrl}/devices/update/${device.id}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${session.data.value?.access_token}`,
                    },
                    body: JSON.stringify({
                        label: device.label,
                        model: Number(device.model),
                        ip: device.ip,
                    }),
                });

            if (!error.value) {
                device.alert.error = false;
                device.alert.message = data.value?.message;
                refreshNuxtData();
            } else {
                device.alert.error = true;
                device.alert.message = error.value.data?.message;
                if (error.value.status === 403) {
                    session.signOut({ redirect: true, callbackUrl: '/login' });
                }
            }
        }
    }
}
</script>