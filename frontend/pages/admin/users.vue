<script setup lang="ts">
useHead({
    title: "Users",
})
const session: any = useSession();
const config = useRuntimeConfig()

let view: { alert: { message: undefined | string, error: boolean } } = reactive({
    alert: {
        message: undefined,
        error: false
    }
});

const { data: users, error } = await useFetch(`${config.public.apiUrl}/users`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "users"
    });

if (error.value) {
    view.alert.error = true;
    view.alert.message = "Unable to fetch users!";
    if (error.value.status === 403) {
        session.signOut({ redirect: true, callbackUrl: '/login' });
    }
}

</script>
<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Users</h1>
            </div>
            <label for="new-user-modal" class="btn btn-primary">
                <Icon name="ic:outline-add" class="w-6 h-6 me-1" />
                Add
            </label>
        </div>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="users.length" v-for="user in users">
                        <th>{{ user.id }}</th>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="3" class="text-center">No users to show</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RegisterUserModal />
    </div>
</template>