import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/auth-state.interface';
import { registerAction } from './actions/register.action';

export const initialState: AuthStateInterface = {
  isSubmitting: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      registerAction,
      (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    )
  ),
});