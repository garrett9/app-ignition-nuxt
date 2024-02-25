/**
 * You can read more about the NuxtJS i18n module here: https://i18n.nuxtjs.org/docs/getting-started
 */
export default defineI18nLocale(async () => {
  return {
    common: {
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
    },

    // General form inputs and actions
    forms: {
      email: 'Email Address',
      password: 'Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
    },

    // Error pages
    errors: {
      pageNotFound: 'Page Not Found',
    },

    // Login page
    login: {
      rememberMe: 'Remember me',
      cta: 'Login',
      forgotPassword: 'Forgot Password',
    },

    // Register page
    register: {
      name: 'Name',
      cta: 'Register',
    },

    // Verify email page
    verifyEmail: {
      heading: `Thanks for signing up! Before getting started, could you verify your email
        address by clicking on the link we just emailed to you? If you didn't
        receive the email, we will gladly send you another.`,
      resendSuccess: `A new verification link has been sent to the email address you provided during registration.`,
      cta: 'Resend Verification Email',
    },

    // Landing page
    landing: {
      welcome: 'Welcome to your NuxtJS Application!',
      nuxtDocs:
        'Understand all of features NuxtJS provides to enhance your Vue application and development experience.',
      vuetifyDocs:
        'Take a look at all of the components at your disposal, how to customize your theme, or the APIs you can use within each component.',
      vuetifySassDocs: `This boilerplate application has already been configured to start modifying the look and feel of Vuetify's components. Check out all of the variables you can modify in your {file} file.`,
      appIgnitionDocs: `Read through the several utilities that have been added to this application that aim to improve your productivity.`,
    },

    // Dashboard page
    dashboard: {
      heading: 'You are now logged in!',
      subtext: `Congratulations! You're ready to get started building your next great idea! May these tools serve you well. Go forth and conquer!`,
    },

    // Forgot password page
    forgotPassword: {
      heading: 'Forgot Password',
      success:
        'An email has been sent to the given address with instructions to reset your password.',
      cta: 'Send Password Reset',
    },

    // Reset password page
    resetPassword: {
      heading: 'Reset Password',
      cta: 'Reset Password',
    },
  };
});
