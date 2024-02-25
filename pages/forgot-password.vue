<template>
  <VRow
    no-gutters
    justify="center"
  >
    <VCol
      cols="12"
      sm="6"
    >
      <VForm @submit.prevent="submit">
        <VCard class="pa-5 d-flex flex-column gr-2">
          <VCardTitle class="text-center">
            {{ $t('forgotPassword.heading') }}
          </VCardTitle>
          <VAlert
            v-if="succeeded"
            color="primary"
            class="mb-5"
          >
            {{ $t('forgotPassword.success') }}
          </VAlert>
          <VTextField
            v-model="email"
            :label="$t('forms.email')"
            type="email"
            :placeholder="$t('forms.email')"
            :error-messages="validationErrors.email"
          />
          <div class="d-flex flex-row justify-end">
            <VBtn
              type="submit"
              :loading="inProgress"
            >
              {{ $t('forgotPassword.cta') }}
            </VBtn>
          </div>
        </VCard>
      </VForm>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
});

const { forgotPassword } = useAuth();

const email = ref('');

const { submit, inProgress, validationErrors, succeeded } = useSubmit(() =>
  forgotPassword(email.value)
);
</script>
