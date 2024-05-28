import { createFeature, createReducer, on } from '@ngrx/store';

import { EditArticleStateInterface } from '../types/edit-article-state.interface';
import { editArticleActions } from './edit-article.actions';
import { routerNavigationAction } from '@ngrx/router-store';

export const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  data: null,
  validationErrors: null,
};

export const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    initialState,
    on(
      editArticleActions.editArticle,
      (state): EditArticleStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      editArticleActions.editArticleSuccess,
      (state, action): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        data: action.article,
        validationErrors: null,
      })
    ),
    on(
      editArticleActions.editArticleFailure,
      (state, action): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        data: null,
        validationErrors: action.errors,
      })
    ),
    on(
      routerNavigationAction,
      (state): EditArticleStateInterface => initialState
    )
  ),
});
