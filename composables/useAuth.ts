import type { ApiResponseNoContent, User } from '../types/api';
import type { ApiError } from '../types/errors';
import { $apiFetch } from '../utils/$apiFetch';

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

export interface UseAuthResponse {
  /**
   * Return the current user set in the composable.
   */
  user: Ref<User | undefined>;

  /**
   * Return whether or not the current user is logged in.
   */
  isLoggedIn: ComputedRef<boolean>;

  /**
   * Attempt to sign in a user into the application.
   *
   * @param credentials
   * @returns
   */
  login: (credentials: LoginCredentials) => Promise<ApiResponseNoContent>;

  /**
   * Attempt to register a user with the application.
   *
   * @param credentials
   * @returns
   */
  register: (credentials: RegisterCredentials) => Promise<ApiResponseNoContent>;

  /**
   * Resend an email verification request for the current user.
   *
   * @returns
   */
  resendEmailVerification: () => Promise<ApiResponseNoContent>;

  /**
   * Log the current user out of the application and clear the composable's User instance.
   *
   * @returns
   */
  logout: () => Promise<ApiResponseNoContent | void>;

  /**
   * Make an attempt to initiate a "Forgot Password" request for the given email address.
   *
   * @param email
   * @returns
   */
  forgotPassword: (email: string) => Promise<ApiResponseNoContent>;

  /**
   * Make an attempt to reset the password for the provided email address.
   *
   * @param credentials
   * @returns
   */
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<ApiResponseNoContent>;

  /**
   * Refresh the composable's current User instance by retrieving the logged in user.
   * This will also clear out the current user if the API request that was made fails for any reason.
   *
   * @returns
   */
  refresh: () => Promise<User | undefined>;
}

// Value is initialized in: ~/plugins/auth.ts
export const useUser = (): Ref<User | undefined> => {
  return useState<User | undefined>('user', () => undefined);
};

export const useAuth = (): UseAuthResponse => {
  const router = useRouter();

  const user = useUser();
  const isLoggedIn = computed(() => !!user.value);

  const refresh = async (): Promise<User | undefined> => {
    try {
      const response = await fetchCurrentUser();
      user.value = response;
      return response;
    } catch (error) {
      user.value = undefined;
      throw error;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<ApiResponseNoContent> => {
    if (user.value) {
      return user.value;
    }

    const response = await $apiFetch<ApiResponseNoContent>('/login', {
      method: 'post',
      body: credentials,
    });
    await refresh();
    return response;
  };

  const register = async (credentials: RegisterCredentials): Promise<ApiResponseNoContent> => {
    const response = await $apiFetch<ApiResponseNoContent>('/register', {
      method: 'post',
      body: credentials,
    });
    await refresh();

    return response;
  };

  const resendEmailVerification = async (): Promise<ApiResponseNoContent> => {
    return await $apiFetch('/email/verification-notification', {
      method: 'post',
    });
  };

  const logout = async (): Promise<ApiResponseNoContent | void> => {
    if (!isLoggedIn.value) {
      return;
    }

    const response = await $apiFetch<ApiResponseNoContent>('/logout', {
      method: 'post',
    });
    user.value = undefined;

    await router.push('/login');

    return response;
  };

  const forgotPassword = async (email: string): Promise<ApiResponseNoContent> => {
    return await $apiFetch<{ status: string }>('/forgot-password', {
      method: 'post',
      body: {
        email,
      },
    });
  };

  const resetPassword = async (
    credentials: ResetPasswordCredentials
  ): Promise<ApiResponseNoContent> => {
    return await $apiFetch<{ status: string }>('/reset-password', {
      method: 'post',
      body: credentials,
    });
  };

  return {
    user,
    isLoggedIn,
    login,
    register,
    resendEmailVerification,
    logout,
    forgotPassword,
    resetPassword,
    refresh,
  };
};

export const fetchCurrentUser = async (): Promise<User | undefined> => {
  try {
    return await $apiFetch<User>('/api/user');
  } catch (e) {
    const error = e as ApiError;
    if ([401, 419].includes(error.statusCode)) {
      return undefined;
    }
    throw error;
  }
};
