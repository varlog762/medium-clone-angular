import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/auth-state.interface';
import { authActions } from './auth.actions';

export const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      authActions.register,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      authActions.login,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),
    on(
      authActions.getCurrentUser,
      (state): AuthStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      authActions.registerSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
        validationErrors: null,
      })
    ),
    on(
      authActions.loginSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
        validationErrors: null,
      })
    ),
    on(
      authActions.getCurrentUserSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
      })
    ),
    on(
      authActions.registerFailure,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    on(
      authActions.loginFailure,
      (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    on(
      authActions.getCurrentUserFailure,
      (state): AuthStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null,
      })
    ),
    on(
      authActions.updateCurrentUserSuccess,
      (state, action): AuthStateInterface => ({
        ...state,
        currentUser: action.currentUser,
      })
    ),
    on(
      authActions.logout,
      (): AuthStateInterface => ({
        ...initialState,
        isLoggedIn: false,
      })
    )
  ),
  extraSelectors: ({ selectIsLoggedIn }) => ({
    selectIsAnonymous: createSelector(
      selectIsLoggedIn,
      isLoggedIn => isLoggedIn === false
    ),
  }),
});
