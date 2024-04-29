import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../types/register-request.interface';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';
import { LoginRequestInterface } from '../types/login-request.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{
      currentUser: CurrentUserInterface;
    }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
    'Get current user': props<{ request: LoginRequestInterface }>(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
