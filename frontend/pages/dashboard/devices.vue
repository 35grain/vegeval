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
} else {
    view.alert.error = false;
    view.alert.message = "";
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="devices?.length" v-for="device in devices">
                        <th>{{ device.label }}</th>
                        <td><div class="flex items-center"><span class="badge badge-warning">Idle</span></div></td>
                        <td>{{ device.model.name }}</td>
                        <td class="flex">
                            <div class="tooltip" data-tip="Copy key">
                                <input @click="copyInputValue" type="text" class="input input-sm cursor-pointer"
                                    readonly :value="device.apiKey">
                            </div>
                        </td>
                        <td>{{ device.ip }}</td>
                        <td>
                            
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
        }
    }
}
</script>