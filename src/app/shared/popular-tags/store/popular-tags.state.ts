import { createFeature, createReducer, on } from '@ngrx/store';

import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';
import { PopularTagsActions } from './popular-tags.actions';

export const initialSate: PopularTagsStateInterface = {
  isLoading: false,
  tags: null,
  error: null,
};

export const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialSate,
    on(
      PopularTagsActions.getPopularTags,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      PopularTagsActions.getPopularTagsSuccess,
      (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        tags: action.tags,
      })
    ),
    on(
      PopularTagsActions.getPopularTagsFailure,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});
