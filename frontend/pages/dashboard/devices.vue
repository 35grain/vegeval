<script setup lang="ts">
useHead({
    title: "Edge devices",
})
</script>
<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Edge devices</h1>
            </div>
            <button class="btn btn-primary">
                <Icon name="ic:outline-add" class="w-6 h-6 me-1" />Add
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Status</th>
                        <th>Model</th>
                        <th>IP</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Feed conveyor</td>
                        <td>Online</td>
                        <td>Red potato</td>
                        <td>123.456.789.0</td>
                        <td><NuxtLink to="./:id" class="btn btn-sm btn-secondary">Edit</NuxtLink></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>