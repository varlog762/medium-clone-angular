import { createFeature, createReducer, on } from '@ngrx/store';

import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';
import { popularTagsActions } from './popular-tags.actions';

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
      popularTagsActions.getPopularTags,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      popularTagsActions.getPopularTagsSuccess,
      (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        tags: action.tags,
      })
    ),
    on(
      popularTagsActions.getPopularTagsFailure,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});
