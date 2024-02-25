<template>
  <VCard
    v-bind="$attrs"
    class="pa-5 fill-height text-primary"
  >
    <VCardText class="text-grey-lighten-1">
      <slot />
    </VCardText>
  </VCard>
</template>