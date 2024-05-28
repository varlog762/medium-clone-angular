import { createFeature, createReducer, on } from '@ngrx/store';

import { CreateArticleStateInterface } from '../types/create-article-state.interface';
import { createArticleActions } from './create-article.actions';

export const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

export const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, state => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, state => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
    })),
    on(createArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))
  ),
});
