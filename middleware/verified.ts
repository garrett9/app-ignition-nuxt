export default defineNuxtRouteMiddleware(() => {
  const user = useUser();

  if (!user.value) {
    return navigateTo('/login');
  }

  if (!user.value?.email_verified_at) {
    return navigateTo('/verify-email');
  }
});
