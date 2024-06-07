import { createFeature, createReducer, on } from '@ngrx/store';

import { ArticleStateInterface } from '../../types/article-state.interface';
import { articleActions } from '../actions/article.actions';
import { routerNavigationAction } from '@ngrx/router-store';

export const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(
      articleActions.getArticle,
      (state): ArticleStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      articleActions.getArticleSuccess,
      (state, action): ArticleStateInterface => ({
        ...state,
        isLoading: false,
        data: action.article,
      })
    ),
    on(
      articleActions.getArticleFailure,
      (state): ArticleStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigationAction, (): ArticleStateInterface => initialState)
  ),
});
