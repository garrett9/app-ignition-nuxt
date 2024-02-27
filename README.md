# Nuxt Boilerplate Application for AppIgnition

## Introduction

This application is a boilerplate [Nuxt](https://nuxt.com) application that can be easily installed with your Laravel applications through [AppIgnition](https://app-ignition.com). It has already been configured with several features that will allow you to start creating your next greatest idea as soon as it's installed.
- The [Vuetify](https://vuetifyjs.com) component library has already been installed and configured.
- The look and feel of your application is ready to be modified through Vuetify's SASS variables.
- A basic implementation of several authentication features is ready to be connected to your back end. This includes several middleware scripts that determine whether a user is logged in, verified, etc.
- A robust configuration of ESLint and Stylelint is included for an optimal Vue & Nuxt development experience.
- The Nuxt Internationalization plugin has been added and is ready for immediate use.
- A basic GitHub workflow has been configured for verifying your builds on new PRs against your `main` branch.
- Automatic Sitemap generation has been included and is immediately available for your Nuxt routes.

Continue reading this documentation for a more in-depth understanding on all of these features, and different ways you can customize them.

### Index
- [Installation](#installation)
- [Vuetify](#vuetify)
- [Authentication](#authentication)
- [API Utilities](#utilities)
- [ESLint & Stylelint](#linting)
- [Internationalization](#internationalization)
- [GitHub Workflow](#github)
- [SEO](#seo)

<span id="installation"></span>

## Installation

### AppIgnition
The recommended approach to install this boilerplate application is to use the [AppIgnition](https://app-ignition.com) Docker Desktop extension. With this extension, you can easily configure a Laravel back end to include a Nuxt front end in minutes. This will also provide a pre-built NodeJS workspace Docker container for you to develop your application.

### Manual
If you'd rather install this application manually, you must first clone this repository.
```bash
git clone https://github.com/garrett9/app-ignition-nuxt my-app
cd my-app
# The `.git` folder can be removed so that you can start a new Git repository from scratch.
rm -rf .git
git init
```

Next, on your Laravel back end, run the following:
```bash
# Install Laravel Breeze and dependencies...
composer require laravel/breeze --dev
php artisan breeze:install api
php artisan migrate
```
This will utilize Laravel Sanctum for handling authentication and create basic API endpoints for login and registration. This will work out-of-the box so long as your front-end and back-end applications share the same top-level domain.

### Environment
If you install this boilerplate using `AppIgnition`, these variables will be automatically set for you. However, if you're installing it manually, make sure to copy the `.env.example` file to a `.env` file. Then, provide the following variables for your environment.
```bash
# The name of your application
APP_NAME="AppIgnition"

# Ensures your application is exposed from your Docker container
# Use "localhost" if you're developing outside of your container.
NUXT_HOST="0.0.0.0"

# Your application's Port
NUXT_PORT=3000

# The URL to your back-end server. 
#
# It must be the same as your front-end server to properly
# authenticate with your back end using cookies. This can be achieved by modifying your
# hosts file if you're hosting the application within a docker container
NUXT_PUBLIC_BACKEND_URL=

# The URL of your application
NUXT_PUBLIC_FRONTEND_URL=
```

<span id="vuetify"></span>

## Vuetify

### Configuration
[Vuetify](https://vuetifyjs.com) is an extensive VueJS component library offering everything you would need to build a production-level application. It has already been installed and configured in this boilerplate, allowing you to start using it immediately. If you wish to configure Vuetify beyond what has already been done, you can do so in the `nuxt.config.ts` file.
```ts
vuetify: {
  moduleOptions: {
    /* other module options */
    styles: {
      configFile: './assets/settings.scss',
    },
  },
  vuetifyOptions: {
    // Learn more about globally configuring component defaults: https://vuetifyjs.com/en/features/global-configuration/
    defaults: {
      VCard: {
        rounded: 'lg',
        // You can configure nested components globally as well
        VBtn: {
          color: 'primary',
        },
      },
      VSheet: {
        rounded: 'lg',
        VBtn: {
          color: 'primary',
        },
      },
      VAlert: {
        color: 'primary',
      },
    },
    theme: {
      // Learn how to customize your branding with Vuetify: https://vuetifyjs.com/en/features/theme/#javascript
      defaultTheme: 'dark',
    },
  },
},
```
Within this configuration block, you can modify your application's default theme or customize your components' default properties.

### SASS Variables

<span id="authentication"></span>

## Authentication
This boilerplate automatically implements the following authentication-related features.
- Login
- Register
- Forgot Password
- Email Verification

With Nuxt's folder-based routing system, you can find all of this implemented logic in the `pages` directory. Furthermore, there are several middleware scripts in the `middleware` directory that can be used to augment any new pages.
- `middleware/auth.ts`
  This middleware can be applied to pages that require a user to be authenticated:
  ```vue
  <script lang="ts" setup>
  definePageMeta({ middleware: ['auth'] });
  </script>
  ```
- `middleware/guest.ts`
  This middleware can be applied to pages that require a user to not be authenticated:
  ```vue
  <script lang="ts" setup>
  definePageMeta({ middleware: ['guest'] });
  </script>
  ```
- `middleware/verified.ts`
  This middleware can be applied to pages that require a user to have his/her email verified:
  ```vue
  <script lang="ts" setup>
  definePageMeta({ middleware: ['verified'] });
  </script>
  ```
- `middleware/unverified.ts`
  This middleware can be applied to pages that require a user to not have his/her email verified yet:
  ```vue
  <script lang="ts" setup>
  definePageMeta({ middleware: ['unverified'] });
  </script>
  ```

The logic responsible for managing authentication features is contained within `composables/useAuth.ts`. This composable also provides access to `useUser`, which enables retrieval of the currently authenticated user.
```ts
<script lang="ts" setup>
const user = useUser();
</script>
```

<span id="utilities"></span>

## API Utilities

### $apiFetch
`$apiFetch` is a Nuxt composable you can use to quickly access your back-end API. It behaves exactly like Nuxt's built-in `$fetch` composable, except all requests are automatically routed to your back end.

### useSubmit
To aid in creating new forms with ease, you can make use of the `useSubmit` composable, which uses the `$apiFetch` composable under the hood. It can help make it easier dealing with validation errors, loading states, and showing messages on successful form submissions.
```vue
<template>
  <VForm
    @submit.prevent="submit"
  >
    <VCard class="pa-5 d-flex flex-column gr-2">
      <VCardTitle class="text-center">
        Create a Member
      </VCardTitle>
      <VTextField
        v-model="data.name"
        label="Name"
        placeholder="Name"
        :error-messages="validationErrors.name"
      />
      <VTextField
        v-model="data.email"
        label="Email"
        type="email"
        placeholder="Email"
        :error-messages="validationErrors.email"
      />
      <div class="d-flex flex-row justify-end">
        <VBtn
          type="submit"
          :loading="inProgress"
        >
          Submit
        </VBtn>
      </div>
    </VCard>
  </VForm>
</template>

<script setup lang="ts">
const data = reactive({
  name: "John Doe",
  email: "johndoe@gmail.com",
});

const {
  submit,
  inProgress,
  validationErrors,
} = useSubmit(() => $apiFetch("/api/member", { method: "post", body: data }), {
  onSuccess: (result) => console.log("Member created successfully", result),
});
</script>
```

<span id="linting"></span>

## ESLint & Stylelint
What I would consider a "must-have" for any development experience, this boilerplate has a very robust and extensive set of configuration files to format and lint your JavaScript, TypeScript, Vue, & SASS files. Each rule has been selected to provide an optimal and enjoyable development experience when building your application.

### ESLint
You can find all of the ESLint rules enabled for your application in the `.eslintrc.cjs` file. Here, you will find rules for:
- Formatting through [Prettier](https://prettier.io)
  - You can modify the rules for Prettier inside the `.eslintrc.cjs` file:
    ```js
        // Prettier Rules
    'prettier-vue/prettier': [
      'error',
      {
        // Override all options of `prettier` here
        // @see https://prettier.io/docs/en/options.html
        printWidth: 100,
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
      },
    ],
    ```
- Typescript
- Vue

### Stylelint
All of the Stylelint configurations can be found in `.stylelintrc.cjs`. It contains rules for writing proper SASS and can automatically format your CSS and SASS files.

### VS Code Integration
To properly utilize ESLint and Stylelint in your VS Code development environment, I'd highly encourage you to use the following extensions:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

However, if you installed your application using AppIgnition, these extensions will automatically be available to you in the NodeJS workspace container.

<span id="internationalization"></span>

## Internationalization
Since it's always best to tackle this problem when first creating your application, the [Nuxt/i18n](https://i18n.nuxtjs.org) plugin has already been installed. The default locale has been set to English, and the language files are lazily loaded from the `lang` directory. You can configure more locales in the `nuxt.config.ts` file:
```ts
i18n: {
  lazy: true,
  defaultLocale: 'en',
  langDir: 'lang',

  // Learn more about locales: https://i18n.nuxtjs.org/docs/guide/lazy-load-translations
  locales: [
    {
      code: 'en',
      file: 'en-US.ts',
    },
  ],
},
```
You can open the existing language `lang/en-US.ts` for all English translations, or add a new language translation by:
1. Adding a new item to the `locales` array in your Nuxt configuration:
  ```ts
  {
    // French
    code: 'fr',
    file: 'fr-FR.ts'
  }
  ```
2. Creating a corresponding language file under the `lang` directory. In the exmaple above, it would be named `lang/fr-FR.ts`.

Your new language can be seen by prefixing your URL path with `/fr`.

<span id="github"></span>

## GitHub Workflow
A GitHub workflow has been included with this boilerplate. It performs the following tasks:
1. Installs your NPM dependencies
2. Runs ESLint
3. Runs Stylelint
4. Builds your app to verify it's ready for production
You can edit this workflow as needed in the file `.github/workflows/ci.yml`.

<span id="seo"></span>

## SEO
By default, the `@nuxtjs/robots` and `@nuxtjs/sitemap` plugins have automatically been installed and configured in your Nuxt configuration file. To modify these settings, open the `nuxt.config.ts` file, and scroll down to the following:
```ts
// robots.txt configuration
robots: {
  UserAgent: '*',
  Allow: '/',
},
// Sitemap configuration
sitemap: {
  cacheMaxAgeSeconds: process.env.NODE_ENV === 'production' ? 3600 : 0,
},
```
For additional packages that might enhance your SEO, check out the [NuxtSEO](https://www.nuxtseo.com) package.