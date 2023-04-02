<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} · Vegeval` : 'Vegeval';
    }
})
</script>

<template>
    <AppHeader />
    <NuxtPage :key="$route.fullPath" />
    <AppFooter />
</template>