<script setup lang="ts">
const { signOut, status, data } = useSession();
</script>

<template>
  <header class="sticky top-0 z-10">
    <div class="navbar w-full bg-base-300/60 backdrop-blur-md">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl text-primary">
          Vegeval
        </NuxtLink>
      </div>
      <div class="flex-none">
        <div v-if="status === 'authenticated'" class="dropdown dropdown-end flex">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full bg-gray-500">
              <img src="/avatar.png" />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52">
            <li>
              <NuxtLink to="/profile" class="flex gap-4 items-center text-start">
                <Icon name="ic:outline-settings" class="w-6 h-6" />
                <span class="flex-1">{{ data?.user?.email }}</span>
              </NuxtLink>
            </li>
            <li><button @click="signOut()" class="flex gap-4 items-center text-start">
                <Icon name="ic:outline-log-out" class="w-6 h-6" />
                <span class="flex-1">Logout</span>
              </button></li>
          </ul>
        </div>
        <NuxtLink v-else to="/login" class="btn btn-primary">
          Login
        </NuxtLink>
      </div>
    </div>
  </header>
</template>