<template>
  <div class="d-flex flex-column ga-10">
    <div class="text-h4 text-center">
      {{ $t('dashboard.heading') }}
    </div>
    <div
      class="text-center"
    >
      {{ $t('dashboard.subtext') }}
    </div>
    <LandingCards />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ['auth', 'verified'] });
</script>
