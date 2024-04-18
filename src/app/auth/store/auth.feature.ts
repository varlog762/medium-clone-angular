import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/auth-state.interface';
import { AuthActions } from '../store/auth.actions';

export const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      AuthActions.register,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      AuthActions.login,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      AuthActions.registerSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
        validationErrors: null,
      })
    ),
    on(
      AuthActions.loginSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
        validationErrors: null,
      })
    ),
    on(
      AuthActions.registerFailure,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    )
  ),
});
