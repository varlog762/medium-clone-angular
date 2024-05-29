import { createFeature, createReducer, on } from '@ngrx/store';

import { EditArticleStateInterface } from '../types/edit-article-state.interface';
import { editArticleActions } from './edit-article.actions';
import { routerNavigationAction } from '@ngrx/router-store';

export const initialState: EditArticleStateInterface = {
  isloading: false,
  isSubmitting: false,
  data: null,
  validationErrors: null,
};

export const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    initialState,
    on(
      editArticleActions.updateArticle,
      (state): EditArticleStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      editArticleActions.updateArticleSuccess,
      (state): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: null,
      })
    ),
    on(
      editArticleActions.updateArticleFailure,
      (state, action): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        data: null,
        validationErrors: action.errors,
      })
    ),
    on(
      editArticleActions.getArticle,
      (state): EditArticleStateInterface => ({
        ...state,
        isloading: true,
      })
    ),
    on(
      editArticleActions.getArticleSuccess,
      (state, action): EditArticleStateInterface => ({
        ...state,
        isloading: false,
        data: action.article,
      })
    ),
    on(
      editArticleActions.getArticleFailure,
      (state): EditArticleStateInterface => ({
        ...state,
        isloading: false,
        data: null,
      })
    ),
    on(
      routerNavigationAction,
      (state): EditArticleStateInterface => initialState
    )
  ),
});
