<script setup lang="ts">
useHead({
    title: "Edge devices",
});
const session: any = useSession();
const config = useRuntimeConfig();

let view: { alert: { message: undefined | string, error: boolean } } = reactive({
    alert: {
        message: undefined,
        error: false
    }
});

const { data: models } = useFetch(`${config.public.apiUrl}/models`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "models"
    });

const { data: clients } = useFetch(`${config.public.apiUrl}/users`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "clients"
    });


const { data: devices, error } = useFetch(`${config.public.apiUrl}/devices`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "devices"
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
    setInterval(() => {
        refreshNuxtData('devices');
    }, 10000);
}
</script>
<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Edge devices</h1>
            </div>
            <div>
                <button class="btn btn-square me-3" @click="refreshNuxtData('devices')">
                    <Icon name="ic:refresh" class="w-6 h-6" />
                </button>
                <label for="new-device-modal" class="btn btn-primary">
                    <Icon name="ic:outline-add" class="w-6 h-6 me-1" />
                    Register
                </label>
            </div>
        </div>
        <Alert :alert="view.alert" />
        <div class="overflow-x-auto">
            <table class="table zebra w-full">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Label</th>
                        <th>Status</th>
                        <th>Evaluation module</th>
                        <th>Access key</th>
                        <th>IP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="devices?.length" v-for=" device  in devices">
                        <th>{{ device.client.email }}</th>
                        <td>{{ device.label }}</td>
                        <td>
                            <div class="flex items-center"
                                v-html="getDeviceStatusBadge(device.lastSeen, device.lastStatus)" />
                        </td>
                        <td>{{ device.model.name }}</td>
                        <td class="flex">
                            <div class="tooltip" data-tip="Copy key">
                                <input @click="copyInputValue" type="text" class="input input-sm cursor-pointer" readonly
                                    :value="device.apiKey">
                            </div>
                        </td>
                        <td>{{ device.ip }}</td>
                        <td>
                            <div class="flex gap-1 items-center">
                                <button class="btn btn-xs btn-primary"
                                    :disabled="['offline', 'detecting'].includes(getDeviceStatus(device.lastSeen, device.lastStatus))"
                                    @click="startDetection(device.id)">Start</button>
                                <button class="btn btn-xs btn-warning"
                                    :disabled="['offline', 'idle'].includes(getDeviceStatus(device.lastSeen, device.lastStatus))"
                                    @click="stopDetection(device.id)">Stop</button>
                                <button class="btn btn-xs btn-error"
                                    :disabled="['offline'].includes(getDeviceStatus(device.lastSeen, device.lastStatus))"
                                    @click="restartDevice(device.id)">Restart</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="7" class="text-center">No devices to show</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RegisterDeviceModal :clients="clients" :models="models" />
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
        startDetection(id: string) {
            const session: any = useSession();
            const config = useRuntimeConfig();
            const { data, error } = useFetch(`${config.public.apiUrl}/devices/${id}/start`,
                {
                    headers: {
                        "Authorization": `Bearer ${session.data.value?.access_token}`,
                    }
                });
        },
        stopDetection(id: string) {
            const session: any = useSession();
            const config = useRuntimeConfig();
            const { data, error } = useFetch(`${config.public.apiUrl}/devices/${id}/stop`,
                {
                    headers: {
                        "Authorization": `Bearer ${session.data.value?.access_token}`,
                    }
                });
        },
        restartDevice(id: string) {
            const session: any = useSession();
            const config = useRuntimeConfig();
            const { data, error } = useFetch(`${config.public.apiUrl}/devices/${id}/restart`,
                {
                    headers: {
                        "Authorization": `Bearer ${session.data.value?.access_token}`,
                    }
                });
        },
        getDeviceStatus(lastSeen: Date, lastStatus: string): string {
            lastSeen = new Date(lastSeen);
            if (new Date().getTime() - lastSeen.getTime() < 10000) {
                if (lastStatus === 'detecting') {
                    return 'detecting'
                }
                return 'idle'
            }
            return 'offline'
        },
        getDeviceStatusBadge(lastSeen: Date, lastStatus: string) {
            const status = this.getDeviceStatus(lastSeen, lastStatus);
            if (status === 'detecting') {
                return '<span class="badge badge-primary">Detecting</span>'
            }
            if (status === 'idle') {
                return '<span class="badge badge-warning">Idle</span>'
            }
            return '<span class="badge badge-error">Offline</span>'
        },
    }
}
</script>