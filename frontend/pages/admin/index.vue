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
</script>

<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Analytics</h1>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-8">
            <div>
                <div class="prose prose-slate text-left">
                    <h2>Model usage</h2>
                </div>
                <canvas id="modelUsageChart"></canvas>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>