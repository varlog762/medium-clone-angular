import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface UserSettingsStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
