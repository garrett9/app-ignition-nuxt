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
        class="pa-5 d-flex flex-column gr-10"
      >
        <div>
          {{ $t('verifyEmail.heading') }}
        </div>

        <div v-if="verificationIsSent">
          {{ $t('verifyEmail.resendSuccess') }}
        </div>

        <VBtn
          :disabled="verificationIsSent"
          :loading="loading"
          @click="handleResendVerification"
        >
          {{ $t('resendVerificationEmail') }}
        </VBtn>
      </VSheet>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['unverified'],
});

const { resendEmailVerification } = useAuth();
const verificationIsSent = ref(false);
const loading = ref(false);

const handleResendVerification = async (): Promise<void> => {
  loading.value = true;
  await resendEmailVerification();
  verificationIsSent.value = true;
  loading.value = false;
};
</script>
