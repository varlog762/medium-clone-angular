import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { AddToFavoritesStateInterface } from '../types/add-to-favorites-state.interface';
import { addToFavoritesActions } from './add-to-favorites.actions';

const initialState: AddToFavoritesStateInterface = {
  isLoading: false,
  articles: [],
  error: null,
};

export const addToFavoritesFeature = createFeature({
  name: 'addToFavorites',
  reducer: createReducer(
    initialState,
    on(
      addToFavoritesActions.addToFavorites,
      (state): AddToFavoritesStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      addToFavoritesActions.addToFavoritesSuccess,
      (state, action): AddToFavoritesStateInterface => {
        const filteredArticles = state.articles.filter(
          article => article.slug !== action.article.slug
        );

        return {
          ...state,
          isLoading: false,
          articles: [...filteredArticles, action.article],
        };
      }
    ),
    on(
      addToFavoritesActions.addToFavoritesFailure,
      (state): AddToFavoritesStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(
      addToFavoritesActions.removeFromFavorites,
      (state): AddToFavoritesStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      addToFavoritesActions.removeFromFavoritesSuccess,
      (state, action): AddToFavoritesStateInterface => {
        const filteredArticles = state.articles.filter(
          article => article.slug !== action.article.slug
        );

        console.log(filteredArticles);

        return {
          ...state,
          isLoading: false,
          articles: [...filteredArticles, action.article],
        };
      }
    ),
    on(
      addToFavoritesActions.removeFromFavoritesFailure,
      (state): AddToFavoritesStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigationAction, (): AddToFavoritesStateInterface => initialState)
  ),
});
