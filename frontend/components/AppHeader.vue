<script setup lang="ts">
const { signOut, status } = useSession();
</script>

<template>
  <header class="sticky top-0 z-10">
    <div class="navbar w-full bg-base-200/60 backdrop-blur-md">
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
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><button @click="signOut()">Logout</button></li>
          </ul>
        </div>
        <NuxtLink v-else to="/login" class="btn btn-primary">
          Login
        </NuxtLink>
      </div>
    </div>
  </header>
</template>