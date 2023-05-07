<script setup lang="ts">
useHead({
    title: "Analytics",
});

import { ChartItem } from 'chart.js/dist/types/index';

const { Chart, registerables } = await import('chart.js');
const session: any = useSession();
const config = useRuntimeConfig();

Chart.register(...registerables);

const { data: statistics, error } = await useFetch(`${config.public.apiUrl}/statistics/system-overview`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "statistics"
    });

const totalStatistics = statistics.value?.statisticsCount;
const usersCount = statistics.value?.usersCount;
const devicesCount = statistics.value?.devicesCount;

const statsInterval = ref(null as any);

if (!error.value) {
    const modelsUsage = statistics.value?.modelsUsage;
    const modelsUsageLabels = modelsUsage.map((model: any) => model.name);
    const modelsUsageData = modelsUsage.map((model: any) => model._count.EdgeDevices);

    const statisticsCountByModel = statistics.value?.statisticsCountByModel;
    const statisticsCountByModelLabels = statisticsCountByModel.map((model: any) => model.name);
    const statisticsCountByModelData = statisticsCountByModel.map((model: any) => model._count.Statistics);

    onMounted(() => {
        const modelUsageCanvas = document.getElementById('modelUsageChart') as ChartItem;
        const modelUsageChart = new Chart(modelUsageCanvas, {
            type: 'bar',
            data: {
                labels: modelsUsageLabels,
                datasets: [{
                    label: 'No. of edge devices',
                    data: modelsUsageData,
                    borderWidth: 1,
                    borderColor: "#7CA982",
                    backgroundColor: "#7CA982"
                }]
            }
        });

        const statCountByModelCanvas = document.getElementById('statCountByModelChart') as ChartItem;
        const statCountByModelChart = new Chart(statCountByModelCanvas, {
            type: 'bar',
            data: {
                labels: statisticsCountByModelLabels,
                datasets: [{
                    label: 'No. of statistics',
                    data: statisticsCountByModelData,
                    borderWidth: 1,
                    borderColor: "#94B9AF",
                    backgroundColor: "#94B9AF",
                }]
            }
        })

        statsInterval.value = setInterval(() => {
            refreshNuxtData("statistics");
            modelUsageChart.data.labels = statistics.value?.modelsUsage.map((model: any) => model.name);
            modelUsageChart.data.datasets[0].data = statistics.value?.modelsUsage.map((model: any) => model._count.EdgeDevices);
            modelUsageChart.update();
            statCountByModelChart.data.labels = statistics.value?.statisticsCountByModel.map((model: any) => model.name);
            statCountByModelChart.data.datasets[0].data = statistics.value?.statisticsCountByModel.map((model: any) => model._count.Statistics);
            statCountByModelChart.update();
        }, 10000);
    });

    onUnmounted(() => {
        clearInterval(statsInterval.value);
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
        <div class="grid grid-cols-2 gap-10">
            <div>
                <div class="prose prose-slate text-left mb-4">
                    <h2>Model usage</h2>
                </div>
                <canvas id="modelUsageChart"></canvas>

                <div class="prose prose-slate text-left my-4">
                    <h2>Statistics collected by model</h2>
                </div>
                <canvas id="statCountByModelChart"></canvas>
            </div>
            <div>
                <div class="prose prose-slate text-left mb-4">
                    <h2>System statistics</h2>
                </div>
                <div class="stats shadow">
                    <div class="stat place-items-center bg-neutral">
                        <div class="stat-title">Statistics collected</div>
                        <div class="stat-value">{{ totalStatistics }}</div>
                    </div>
                    <div class="stat place-items-center bg-neutral">
                        <div class="stat-title">Users</div>
                        <div class="stat-value">{{ usersCount }}</div>
                    </div>
                    <div class="stat place-items-center bg-neutral">
                        <div class="stat-title">Edge devices</div>
                        <div class="stat-value">{{ devicesCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>