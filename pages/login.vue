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
          <div class="d-flex flex-row justify-space-between align-center">
            <VCheckbox
              v-model="data.remember"
              :label="$t('login.rememberMe')"
              hide-details
            />
            <VBtn
              type="submit"
              :loading="inProgress"
            >
              {{ $t('login.cta') }}
            </VBtn>
          </div>
          <VDivider />
          <VBtn
            nuxt
            color="default"
            variant="text"
            to="/forgot-password"
          >
            {{ $t('login.forgotPassword') }}
          </VBtn>
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
const { login } = useAuth();

const data: LoginCredentials = reactive({
  email: '',
  password: '',
  remember: false,
});

const { home } = useRuntimeConfig().public;
const { submit, inProgress, validationErrors } = useSubmit(() => login(data), {
  onSuccess: () => router.push(home),
});
</script>
