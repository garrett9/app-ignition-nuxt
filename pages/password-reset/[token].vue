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
            {{ $t('resetPassword.heading') }}
          </VCardTitle>
          <VTextField
            v-model="data.email"
            :label="$t('forms.email')"
            type="email"
            :placeholder="$t('forms.email')"
            :error-messages="validationErrors.email"
          />

          <VTextField
            v-model="data.password"
            :label="$t('forms.password')"
            type="password"
            :placeholder="$t('forms.password')"
            :error-messages="validationErrors.password"
          />

          <VTextField
            v-model="data.password_confirmation"
            :label="$t('forms.confirmPassword')"
            type="password"
            :placeholder="$t('forms.confirmPassword')"
          />

          <div class="d-flex flex-row justify-end">
            <VBtn
              type="submit"
              :loading="inProgress"
            >
              {{ $t('resetPassword.cta') }}
            </VBtn>
          </div>
        </VCard>
      </VForm>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import type { ResetPasswordCredentials } from '../../composables/useAuth';

definePageMeta({
  middleware: ['guest'],
});

const router = useRouter();
const route = useRoute();
const { resetPassword } = useAuth();

const data: ResetPasswordCredentials = reactive({
  email: route.query.email?.toString() || '',
  password: '',
  password_confirmation: '',
  token: route.params.token.toString(),
});
const { submit, inProgress, validationErrors } = useSubmit(
  () =>
    resetPassword({
      ...data,
    }),
  {
    onSuccess: () =>
      router.push({
        path: '/login',
      }),
  }
);
</script>
