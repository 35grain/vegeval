<script setup lang="ts">
import { ChartItem } from 'chart.js/dist/types/index';

const { Chart, registerables } = await import('chart.js');
const session: any = useSession();
const config = useRuntimeConfig()

Chart.register(...registerables);
</script>

<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Analytics</h1>
            </div>
        </div>
    </div>
</template>