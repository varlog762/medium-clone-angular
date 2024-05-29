import { createFeature, createReducer, on } from '@ngrx/store';

import { UserSettingsStateInterface } from '../types/user-setting-state.interface';
import { authActions } from '../../auth/store/auth.actions';

export const initialState: UserSettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

export const userSettingsFeature = createFeature({
  name: 'userSettings',
  reducer: createReducer(
    initialState,
    on(
      authActions.updateCurrentUser,
      (state): UserSettingsStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      authActions.updateCurrentUserSuccess,
      (state): UserSettingsStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: null,
      })
    ),
    on(
      authActions.updateCurrentUserFailure,
      (state, action): UserSettingsStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    )
  ),
});
