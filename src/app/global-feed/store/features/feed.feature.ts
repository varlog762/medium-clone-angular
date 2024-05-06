import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../../types/feed-state.interface';
import { FeedActions } from '../actions/feed.actions';
import { routerNavigationAction } from '@ngrx/router-store';

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
      FeedActions.getFeed,
      (state): FeedStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      FeedActions.getFeedSuccess,
      (state, action): FeedStateInterface => ({
        ...state,
        isLoading: false,
        error: null,
        data: action.feed,
      })
    ),
    on(
      FeedActions.getFeedFailure,
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
