<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
});
useHead({
    title: "Dashboard",
})
</script>

<template>
    <main class="drawer drawer-mobile -mt-[4rem]">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col p-16 mt-[4rem]">
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            <NuxtPage />
        </div>
        <div class="drawer-side mt-[4rem]">
            <aside class="bg-base-300 py-4">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu px-4 w-80 bg-base-300 text-sm">
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
                <ul class="menu px-4 w-80 bg-base-300 text-sm">
                   <li></li>
                   <li>
                        <NuxtLink to="/dashboard/models" class="flex gap-4 items-center" exact-active-class="active">
                            <Icon name="ic:baseline-filter-center-focus" class="w-6 h-6" />
                            <span class="flex-1">Models</span>
                        </NuxtLink>
                    </li> 
                </ul>
            </aside>
        </div>
    </main>
</template>