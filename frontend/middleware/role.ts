export default defineNuxtRouteMiddleware((to, from) => {
  const { data } = useSession();
  // If the user is not authorized, redirect to user dashboard
  if (data.value?.role !== 'admin') {
    return navigateTo('/dashboard')
  }
})