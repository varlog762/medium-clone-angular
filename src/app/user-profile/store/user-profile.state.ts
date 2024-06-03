import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { UserProfileStateInterface } from '../types/user-profile-state.interface';
import { userProfileActions } from './user-profile.actions';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  profile: null,
  errors: null,
};

export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(
      userProfileActions.getProfile,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      userProfileActions.getProfileSuccess,
      (state, action): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
        errors: null,
        profile: action.profile,
      })
    ),
    on(
      userProfileActions.getProfileFailure,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
        profile: null,
      })
    ),
    on(routerNavigationAction, (): UserProfileStateInterface => initialState)
  ),
});
