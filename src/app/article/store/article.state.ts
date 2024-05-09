import { createFeature, createReducer, on } from '@ngrx/store';

import { ArticleStateInterface } from '../types/article-state.interface';
import { ArticleActions } from './article.actions';

export const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(ArticleActions.getArticle, state => ({
      ...state,
      isLoading: true,
    })),
    on(ArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(ArticleActions.getArticleFailure, state => ({
      ...state,
      isLoading: false,
    }))
  ),
});
