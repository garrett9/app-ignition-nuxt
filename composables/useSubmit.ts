import type { ApiResponse, ApiResponseNoContent } from '../types/api';
import type { ApiError, ValidationErrors } from '../types/errors';

export type UseSubmitOptions<T extends ApiResponse | ApiResponseNoContent = ApiResponse> = {
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
};

export interface UseSubmitResposne {
  submit: () => Promise<void>;
  inProgress: Ref<boolean>;
  succeeded: Ref<boolean | null>;
  validationErrors: Ref<ValidationErrors>;
  error: Ref<Error | null>;
}

export const useSubmit = <T extends ApiResponse | ApiResponseNoContent = ApiResponseNoContent>(
  fetchable: () => Promise<T>,
  options: UseSubmitOptions<T> = {}
): UseSubmitResposne => {
  const validationErrors = ref<ValidationErrors>({});
  const error = ref<Error | null>(null);
  const inProgress = ref(false);
  const succeeded = ref<boolean | null>(null);

  const submit = async (): Promise<void> => {
    validationErrors.value = {};
    error.value = null;
    inProgress.value = true;
    succeeded.value = null;

    try {
      const data = await fetchable();
      succeeded.value = true;
      options?.onSuccess?.(data);
    } catch (e) {
      const fetchError = e as ApiError;
      error.value = fetchError;
      succeeded.value = false;
      validationErrors.value = fetchError.data?.errors ?? {};
      succeeded.value = false;
      options?.onError?.(fetchError);

      if (fetchError.statusCode !== 422) {
        throw e;
      }
    } finally {
      inProgress.value = false;
    }
  };

  return {
    submit,
    inProgress,
    succeeded,
    validationErrors,
    error,
  };
};
