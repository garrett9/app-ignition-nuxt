export default defineNuxtRouteMiddleware(() => {
  const user = useUser();
  if (user.value) {
    const { home } = useRuntimeConfig().public;
    return navigateTo(home, {
      replace: true,
    });
  }
});
