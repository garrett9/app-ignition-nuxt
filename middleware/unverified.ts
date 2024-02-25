export default defineNuxtRouteMiddleware(() => {
  const user = useUser();

  if (!user.value) {
    return navigateTo('/login');
  }

  if (user.value.email_verified_at || user.value.is_verified) {
    const { home } = useRuntimeConfig().public;
    return navigateTo(home);
  }
});
