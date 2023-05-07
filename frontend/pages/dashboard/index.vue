<script setup lang="ts">
import { ChartItem } from 'chart.js';

const { Chart, registerables } = await import('chart.js');
const session: any = useSession();
const config = useRuntimeConfig()

Chart.register(...registerables);

const { data: statistics, error } = await useFetch(`${config.public.apiUrl}/statistics/overview`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "statistics"
    });

const modelsInterval = ref(null as any)
const othersInterval = ref(null as any)

if (!error.value) {
    const classDistributionByModel = statistics.value?.classDistributionByModel;
    const statisticsCountByDevice = statistics.value?.statisticsCountByDevice;
    const numberOfFramesInDetection = statistics.value?.numberOfFramesInDetection;
    onMounted(() => {
        const chartsDiv = document.getElementById('charts');
        classDistributionByModel.forEach(model => {
            if (!document.getElementById(`modelChart-${model.modelName}`)) {
                const classDistributionLabels = model.stats.map((m: any) => m.clsName);
                const classDistributionData = model.stats.map((m: any) => m._count.clsName);

                const modelCanvas = document.createElement('canvas');
                const titleDiv = document.createElement('div');
                titleDiv.setAttribute('class', 'prose prose-slate text-left mb-4');
                titleDiv.innerHTML = `<h2>Class distribution of ${model.modelName}</h2>`;
                modelCanvas.setAttribute('id', `modelChart-${model.modelName}`);
                modelCanvas.setAttribute('class', 'mb-10');
                chartsDiv?.appendChild(titleDiv);
                chartsDiv?.appendChild(modelCanvas);

                const modelChart = new Chart(modelCanvas, {
                    type: 'bar',
                    data: {
                        labels: classDistributionLabels,
                        datasets: [{
                            label: 'No. of objects',
                            data: classDistributionData,
                            borderWidth: 1,
                            borderColor: "#7CA982",
                            backgroundColor: "#7CA982",
                        }]
                    }
                });
                modelsInterval.value = setInterval(() => {
                    modelChart.data.labels = model.stats.map((m: any) => m.clsName);
                    modelChart.data.datasets[0].data = model.stats.map((m: any) => m._count.clsName);
                    modelChart.update();
                }, 10000);
            }
        });

        const statsByDeviceLabels = statisticsCountByDevice.map((d: any) => d.deviceLabel);
        const statsByDeviceData = statisticsCountByDevice.map((d: any) => d.count);

        const devicesCanvas = document.getElementById('devicesChart') as ChartItem;
        const devicesChart = new Chart(devicesCanvas, {
            type: 'bar',
            data: {
                labels: statsByDeviceLabels,
                datasets: [{
                    label: 'No. of statistics',
                    data: statsByDeviceData,
                    borderWidth: 1,
                    borderColor: "#94B9AF",
                    backgroundColor: "#94B9AF",
                }]
            }
        });

        const numberOfFramesInDetectionLabels = numberOfFramesInDetection.map((d: any) => d.frames);
        const numberOfFramesInDetectionData = numberOfFramesInDetection.map((d: any) => d._count.frames);

        const statsCanvas = document.getElementById('statisticsChart') as ChartItem;
        const statsChart = new Chart(statsCanvas, {
            type: 'scatter',
            data: {
                labels: numberOfFramesInDetectionLabels,
                datasets: [{
                    label: 'No. of frames in detection',
                    data: numberOfFramesInDetectionData,
                }]
            }
        });

        othersInterval.value = setInterval(() => {
            refreshNuxtData('statistics');
            devicesChart.data.labels = statistics.value?.statisticsCountByDevice.map((d: any) => d.deviceLabel);
            devicesChart.data.datasets[0].data = statistics.value?.statisticsCountByDevice.map((d: any) => d.count);
            devicesChart.update();

            statsChart.data.labels = statistics.value?.numberOfFramesInDetection.map((d: any) => d.frames);
            statsChart.data.datasets[0].data = statistics.value?.numberOfFramesInDetection.map((d: any) => d._count.frames);
            statsChart.update();
        }, 10000);
    });

    onUnmounted(() => {
        clearInterval(modelsInterval.value);
        clearInterval(othersInterval.value);
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
                <div id="charts"></div>
            </div>
            <div>
                <div class="mb-10">
                    <div class="prose prose-slate text-left mb-4">
                        <h2>Number of frames in detection</h2>
                    </div>
                    <canvas id="statisticsChart"></canvas>
                </div>
                <div>
                    <div class="prose prose-slate text-left mb-4">
                        <h2>Statistics collected by device</h2>
                    </div>
                    <canvas id="devicesChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>