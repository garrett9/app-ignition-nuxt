<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <LandingCard
        title="NuxtJS Documentation"
        href="https://nuxt.com"
        target="_blank"
        prepend-icon="mdi-nuxt"
      >
        {{ $t('landing.nuxtDocs') }}
      </LandingCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <LandingCard
        title="Vuetify Documentation"
        href="https://vuetifyjs.com"
        target="_blank"
        prepend-icon="$vuetify"
      >
        {{ $t('landing.vuetifyDocs') }}
      </LandingCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <LandingCard
        title="Vuetify SASS Variables"
        href="https://vuetifyjs.com/en/features/sass-variables/#variable-api"
        target="_blank"
        prepend-icon="mdi-sass"
      >
        <I18nT
          keypath="landing.vuetifySassDocs"
        >
          <template #file>
            <strong>assets/settings.scss</strong>
          </template>
        </I18nT>
      </LandingCard>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <LandingCard
        title="AppIgnition Documentation"
        href="https://app-ignition.com/docs/1.0/about"
        target="_blank"
        prepend-icon="mdi-rocket-launch"
      >
        {{ $t('landing.appIgnitionDocs') }}
      </LandingCard>
    </VCol>
  </VRow>
</template>