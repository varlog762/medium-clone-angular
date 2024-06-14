import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { AddToFollowStateInterface } from '../types/add-to-follow-state.interface';
import { addToFollowActions } from './add-to-follow.actions';

const initialState: AddToFollowStateInterface = {
  isFollowed: null,
  isLoading: false,
};

export const addToFollowFeature = createFeature({
  name: 'addToFollow',
  reducer: createReducer(
    initialState,
    on(
      addToFollowActions.followUser,
      (state): AddToFollowStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      addToFollowActions.followUserSuccess,
      (state, action): AddToFollowStateInterface => ({
        ...state,
        isLoading: false,
        isFollowed: action.profile.following,
      })
    ),
    on(
      addToFollowActions.followUserFailure,
      (state): AddToFollowStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigationAction, (): AddToFollowStateInterface => initialState)
  ),
});
