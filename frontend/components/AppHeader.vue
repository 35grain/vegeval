<script setup lang="ts">
const { signOut, status } = useSession();
</script>

<template>
  <div class="navbar bg-base-100/60 backdrop-blur-md border-b border-b-neutral-800 sticky top-0">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl text-primary">
        Vegeval
      </NuxtLink>
    </div>
    <div class="flex-none">
      <button v-if="status === 'authenticated'" class="btn btn-primary" @click="signOut()">
        Log out
      </button>
      <NuxtLink v-else to="/login" class="btn btn-primary">
        Login
      </NuxtLink>
    </div>
  </div>
</template>