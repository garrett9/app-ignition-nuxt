<template>
  <div>
    <Head>
      <Title>{{ config.public.appName }}</Title>
    </Head>

    <VContainer class="mx-auto d-flex align-center justify-center">
      <VAppBarTitle>
        <NuxtLink to="/">
          {{ config.public.appName }}
        </NuxtLink>
      </VAppBarTitle>

      <VSpacer />

      <div v-if="user">
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              v-bind="props"
              variant="text"
            >
              {{ user.name }}
            </VBtn>
          </template>
          <VList>
            <VListItem
              @click="logout"
            >
              <VListItemTitle>
                {{ $t('common.logout') }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
      <div v-else>
        <VBtn
          nuxt
          variant="text"
          to="/login"
        > 
          {{ $t('common.login') }}
        </VBtn>
        <VBtn
          nuxt
          to="/register"
          variant="text"
        >
          {{ $t('common.register') }}
        </VBtn>
      </div>
    </VContainer>

    <VMain class="mt-10">
      <VContainer class="fill-height">
        <slot />
      </VContainer>
    </VMain>
  </div>
</template>

<script lang="ts" setup>
const user = useUser();
const config = useRuntimeConfig();
const { logout } = useAuth();
</script>
