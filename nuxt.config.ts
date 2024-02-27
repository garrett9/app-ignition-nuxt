import { defineNuxtConfig } from 'nuxt/config';

// See what else you can configure with Nuxt: https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // Learn more: https://vuetify-nuxt-module.netlify.app/
    'vuetify-nuxt-module',

    // Learn more: https://nuxt.com/modules/eslint
    '@nuxtjs/eslint-module',

    // Learn more: https://nuxt.com/modules/robots
    '@nuxtjs/robots',

    // Learn more: https://nuxtseo.com/sitemap/getting-started/installation
    '@nuxtjs/sitemap',

    // Learn more: https://i18n.nuxtjs.org/docs/getting-started
    '@nuxtjs/i18n',
  ],
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
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
  i18n: {
    lazy: true,
    defaultLocale: 'en',
    langDir: 'lang',

    // Learn more about locales: https://i18n.nuxtjs.org/docs/guide/seo#requirements
    locales: [
      {
        code: 'en',
        file: 'en-US.ts',
      },
    ],
  },
  site: {
    url: process.env.NUXT_PUBLIC_FRONTEND_URL,
  },
  // robots.txt configuration located at /robots.txt
  robots: {
    UserAgent: '*',
    Allow: '/',
  },
  // Sitemap configuration located at /sitemap.xml
  sitemap: {
    cacheMaxAgeSeconds: process.env.NODE_ENV === 'production' ? 3600 : 0,
  },
  css: ['vuetify/styles'],
  typescript: {
    typeCheck: true,
    strict: true,
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL,

      // TODO change your App's "Home" path. Users will be redirected to this location
      // after a successful login, a successful email verificaiton, or if they are
      // already logged in.
      home: '/dashboard',
    },
  },
  imports: {
    dirs: ['./utils'],
  },
  experimental: {
    asyncContext: true,
  },
  features: {
    inlineStyles: false,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },

      // TODO Modify your application's title
      title: process.env.APP_NAME,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // TODO Modify your application's keywords
        { name: 'keywords', content: '' },

        // TODO Modify your application's description
        {
          name: 'description',
          content: 'A description for your application.',
        },
      ],
      link: [
        // TODO Modify your application's favicon.
        // This can be found under in the "public" folder.
        {
          rel: 'icon',
          href: '/favicon.svg',
        },
      ],
    },
  },
});
