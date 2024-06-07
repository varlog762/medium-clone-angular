import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { ArticleCommentsStateInterface } from '../../types/article-comments-state.interface';
import { articleCommentsActions } from '../actions/article-comments.actions';

const initialState: ArticleCommentsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const articleCommentsFeature = createFeature({
  name: 'articleComments',
  reducer: createReducer(
    initialState,
    on(
      articleCommentsActions.getComments,
      (state): ArticleCommentsStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      articleCommentsActions.getCommentsSuccess,
      (state, action): ArticleCommentsStateInterface => ({
        ...state,
        isLoading: false,
        error: null,
        data: action.comments,
      })
    ),
    on(
      articleCommentsActions.getCommentsFailure,
      (state): ArticleCommentsStateInterface => ({
        ...state,
        isLoading: false,
        data: null,
      })
    ),
    on(
      routerNavigationAction,
      (state): ArticleCommentsStateInterface => initialState
    )
  ),
});
