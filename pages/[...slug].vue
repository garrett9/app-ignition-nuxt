<template>
  <VRow
    no-gutters
    justify="center"
  >
    <VCol
      cols="12"
      sm="6"
    >
      <VSheet
        class="pa-15 d-flex flex-column gr-10 text-center"
      >
        <div class="text-h2">
          404
        </div>
        <div class="text-h5">
          {{ $t('errors.pageNotFound') }}
        </div>
      </VSheet>
    </VCol>
  </VRow>
</template>