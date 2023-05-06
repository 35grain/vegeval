<script setup lang="ts">
useHead({
    title: "Modules",
})
const session: any = useSession();
const config = useRuntimeConfig()

let view: { alert: { message: undefined | string, error: boolean } } = reactive({
    alert: {
        message: undefined,
        error: false
    }
});

const { data: modules, error } = await useFetch(`${config.public.apiUrl}/models`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        },
        key: "modules"
    });

if (error.value) {
    view.alert.error = true;
    view.alert.message = "Unable to fetch modules!";
    if (error.value.status === 403) {
        session.signOut({ redirect: true, callbackUrl: '/login' });
    }
} else {
    view.alert.error = false;
    view.alert.message = "";
}

</script>
<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Evaluation modules</h1>
            </div>
            <label for="new-model-modal" class="btn btn-primary">
                <Icon name="ic:outline-add" class="w-6 h-6 me-1" />
                New
            </label>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>S3 name</th>
                        <th>Version</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="modules?.length" v-for="model in modules">
                        <th>{{ model.name }}</th>
                        <td>{{ model.objectName }}</td>
                        <td><span class="badge">{{ model.version }}</span></td>
                        <td>{{ new Date(model.updatedAt).toLocaleString() }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="4" class="text-center">No modules to show</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <RegisterModelModal />
    </div>
</template>