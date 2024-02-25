<template>
  <VRow
    no-gutters
    justify="center"
  >
    <VCol
      cols="12"
      sm="6"
    >
      <VForm
        @submit.prevent="submit"
      >
        <VCard class="pa-5 d-flex flex-column gr-2">
          <VCardTitle class="text-center">
            {{ $config.public.appName }}
          </VCardTitle>
          <VTextField
            v-model="data.name"
            :label="$t('register.name')"
            :placeholder="$t('register.name')"
            :error-messages="validationErrors.name"
          />
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
              {{ $t('register.cta') }}
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

const router = useRouter();
const { register } = useAuth();

const data: RegisterCredentials = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const { home } = useRuntimeConfig().public;
const { submit, inProgress, validationErrors } = useSubmit(() => register(data), {
  onSuccess: () => router.push(home),
});
</script>
