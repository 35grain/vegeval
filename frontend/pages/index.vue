<script setup lang="ts">
const { status } = useSession();
if (status.value === 'authenticated' ) {
    navigateTo('/dashboard');
}
</script>
<template>
  <div class="hero h-screen -mt-[4rem] relative">
    <video class="w-full h-full object-cover" autoplay muted loop>
      <source src="/hero_video.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay h-full bg-opacity-60 backdrop-blur-sm"></div>
    <div class="hero-content h-full text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">The AI powered vegetable quality evaluation tool</h1>
        <p class="mb-5">Some introduction message here.</p>
        <NuxtLink to="/login" class="btn btn-primary">Get Started</NuxtLink>
      </div>
    </div>
  </div>
</template>