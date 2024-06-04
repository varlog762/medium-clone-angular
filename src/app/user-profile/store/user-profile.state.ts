import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { UserProfileStateInterface } from '../types/user-profile-state.interface';
import { userProfileActions } from './user-profile.actions';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  profile: null,
  error: null,
};

export const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(
      userProfileActions.getUserProfile,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      userProfileActions.getUserProfileSuccess,
      (state, action): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
        error: null,
        profile: action.profile,
      })
    ),
    on(
      userProfileActions.getUserProfileFailure,
      (state): UserProfileStateInterface => ({
        ...state,
        isLoading: false,
        profile: null,
      })
    ),
    on(routerNavigationAction, (): UserProfileStateInterface => initialState)
  ),
});
