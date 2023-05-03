<script setup lang="ts">
useHead({
    title: "Analytics",
});

import { ChartItem } from 'chart.js/dist/types/index';

const { Chart, registerables } = await import('chart.js');
const session: any = useSession();
const config = useRuntimeConfig()

Chart.register(...registerables);

const { data: modelsUsage, error } = await useFetch(`${config.public.apiUrl}/models/usage`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "models"
    });

if (!error.value) {
    const modelsUsageLabels = modelsUsage.value.map((model: any) => model.name);
    const modelsUsageData = modelsUsage.value.map((model: any) => model._count.EdgeDevices);

    onMounted(() => {
        const modelUsageChart = document.getElementById('modelUsageChart') as ChartItem;
        new Chart(modelUsageChart, {
            type: 'bar',
            data: {
                labels: modelsUsageLabels,
                datasets: [{
                    label: 'Edge Devices',
                    data: modelsUsageData,
                    borderWidth: 1
                }]
            }
        })
    });
}

const { data: totalStatistics } = await useFetch(`${config.public.apiUrl}/statistics/count`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "statistics-count"
    });

const { data: usersCount } = await useFetch(`${config.public.apiUrl}/users/count`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "users-count"
    });

const { data: devicesCount } = await useFetch(`${config.public.apiUrl}/devices/count/all`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "devices-count"
    });

</script>

<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Analytics</h1>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-10">
            <div>
                <div class="prose prose-slate text-left mb-4">
                    <h2>Model usage</h2>
                </div>
                <canvas id="modelUsageChart"></canvas>
            </div>
            <div>
                <div class="prose prose-slate text-left mb-4">
                    <h2>System statistics</h2>
                </div>
                <div class="stats shadow">
                    <div class="stat place-items-center bg-secondary">
                        <div class="stat-title">Statistics collected</div>
                        <div class="stat-value">{{ totalStatistics }}</div>
                    </div>
                    <div class="stat place-items-center bg-secondary">
                        <div class="stat-title">Users</div>
                        <div class="stat-value">{{ usersCount }}</div>
                    </div>
                    <div class="stat place-items-center bg-secondary">
                        <div class="stat-title">Edge devices</div>
                        <div class="stat-value">{{ devicesCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>