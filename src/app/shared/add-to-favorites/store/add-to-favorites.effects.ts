import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { addToFavoritesActions } from './add-to-favorites.actions';
import { AddToFavoritesService } from '../services/add-to-favorites.service';
import { ArticleInterface } from '../../types/article.interface';

@Injectable()
export class AddToFavoriteEffects {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ slug, isFavorited }) => {
        const favoritedStream$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);

        return favoritedStream$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}
}
