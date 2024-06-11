import { createFeature, createReducer } from '@ngrx/store';

const initialState = {};

export const addToFavoritesFeature = createFeature({
  name: 'addToFavorites',
  reducer: createReducer(initialState),
});
