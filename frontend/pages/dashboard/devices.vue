<script setup lang="ts">
useHead({
    title: "Edge devices",
});
const session: any = useSession();
const config = useRuntimeConfig()

let view: { alert: { message: undefined | string, error: boolean } } = reactive({
    alert: {
        message: undefined,
        error: false
    }
});

const { data: devices, error } = useFetch(`${config.public.apiUrl}/devices/${session.data.value?.id}`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        }
    });

const { data: models } = useFetch(`${config.public.apiUrl}/models`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        }
    });

if (error.value) {
    view.alert.error = true;
    view.alert.message = "Unable to fetch devices!";
    if (error.value.status === 403) {
        session.signOut({ redirect: true, callbackUrl: '/login' });
    }
}
</script>
<template>
    <div>
        <div class="prose prose-slate text-left mb-12">
            <h1>Edge devices</h1>
        </div>
        <Alert :alert="view.alert" />
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Status</th>
                        <th>Model</th>
                        <th>API key</th>
                        <th>IP</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="devices?.length" v-for="device in devices">
                        <th>{{ device.label }}</th>
                        <td>{{ device.status }}</td>
                        <td>{{ device.model.name }}</td>
                        <td class="flex">
                            <div class="tooltip" data-tip="Copy key">
                                <input @click="copyInputValue" type="password" class="input input-sm cursor-pointer"
                                    readonly :value="device.apiKey">
                            </div>
                            <div class="tooltip ms-2 my-auto" data-tip="Show/hide key">
                                <label class="swap">
                                    <input @change="toggleKeyVisibility" type="checkbox" />
                                    <Icon name="bi:eye-fill" class="swap-on fill-current" />
                                    <Icon name="bi:eye-slash-fill" class="swap-off fill-current" />
                                </label>
                            </div>
                        </td>
                        <td>{{ device.ip }}</td>
                        <td>
                            <label for="edit-device-modal" class="btn btn-sm btn-secondary">Edit</label>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="6" class="text-center">No devices to show</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RegisterDeviceModal :models="models"/>
    </div>
</template>
<script lang="ts">
export default {
    methods: {
        copyInputValue(e: MouseEvent) {
            const input = e.target as HTMLInputElement;
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value);
        },
        toggleKeyVisibility(e: Event) {
            const input = e.target as HTMLInputElement;
            const key = input.parentElement?.parentElement?.parentElement?.children[0] as HTMLInputElement;
            if (input.checked) {
                key.type = "text";
            } else {
                key.type = "password";
            }
        },
    }
}
</script>