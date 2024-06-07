import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { ArticleCommentsStateInterface } from '../../types/article-comments-state.interface';
import { articleCommentsActions } from '../actions/article-comments.actions';

const initialState: ArticleCommentsStateInterface = {
  isLoading: false,
  isSubmitting: false,
  errors: null,
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
        errors: null,
        data: action.comments,
      })
    ),
    on(
      articleCommentsActions.getCommentsFailure,
      (state): ArticleCommentsStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(
      articleCommentsActions.addComment,
      (state): ArticleCommentsStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      articleCommentsActions.addCommentSuccess,
      (state, action): ArticleCommentsStateInterface => ({
        ...state,
        isSubmitting: false,
        errors: null,
        data: [...(state.data || []), action.comment],
      })
    ),
    on(
      articleCommentsActions.addCommentFailure,
      (state, action): ArticleCommentsStateInterface => ({
        ...state,
        isSubmitting: false,
        errors: action.errors,
      })
    ),
    on(
      routerNavigationAction,
      (state): ArticleCommentsStateInterface => initialState
    )
  ),
});
