import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { FeedStateInterface } from '../types/feed-state.interface';
import { feedActions } from './feed.actions';

export const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(
      feedActions.getFeed,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      feedActions.getFeedSuccess,
      (state, action): FeedStateInterface => ({
        ...state,
        isLoading: false,
        error: null,
        data: action.feed,
      })
    ),
    on(
      feedActions.getFeedFailure,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(
      routerNavigationAction,
      (state): FeedStateInterface => ({
        ...state,
        data: null,
      })
    )
  ),
});
