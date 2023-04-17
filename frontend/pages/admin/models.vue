<script setup lang="ts">
useHead({
    title: "Models",
})
const session: any = useSession();
const config = useRuntimeConfig()

let view: { alert: { message: undefined | string, error: boolean } } = reactive({
    alert: {
        message: undefined,
        error: false
    }
});

const { data: models, error } = await useFetch(`${config.public.apiUrl}/models`,
    {
        headers: {
            "Authorization": `Bearer ${session.data.value?.access_token}`,
        }
    });

if (error.value) {
    view.alert.error = true;
    view.alert.message = "Unable to fetch models!";
    if (error.value.status === 403) {
        session.signOut({ redirect: true, callbackUrl: '/login' });
    }
}

</script>
<template>
    <div>
        <div class="flex justify-between">
            <div class="prose prose-slate text-left mb-12">
                <h1>Models</h1>
            </div>
            <label for="new-model-modal" class="btn btn-primary">
                <Icon name="ic:outline-add" class="w-6 h-6 me-1" />
                Add
            </label>
        </div>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="models.length" v-for="model in models">
                        <th>{{ model.name }}</th>
                        <td><span class="badge">{{ model.version }}</span></td>
                        <td>{{ model.updatedAt }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="3" class="text-center">No models to show</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>