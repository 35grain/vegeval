<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
});
useHead({
    title: "Dashboard",
})
</script>

<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center justify-center">
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            <NuxtPage />
        </div>
        <div class="drawer-side">
            <aside class="bg-base-300">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 bg-base-300 text-sm">
                    <li>
                        <NuxtLink to="/dashboard" class="flex gap-4 items-center" exact-active-class="active">
                            <Icon name="ic:baseline-dashboard" class="w-6 h-6" />
                            <span class="flex-1">Overview</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/dashboard/devices" class="flex gap-4 items-center" exact-active-class="active">
                            <Icon name="ic:outline-linked-camera" class="w-6 h-6" />
                            <span class="flex-1">Edge devices</span>
                        </NuxtLink>
                    </li>
                </ul>
            </aside>
        </div>
    </div>
</template>