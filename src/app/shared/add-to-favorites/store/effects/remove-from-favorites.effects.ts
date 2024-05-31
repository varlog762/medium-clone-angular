import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AddToFavoreitesService } from '../../services/add-to-favorites.service';
import { addToFavoritesActions } from '../add-to-favorites.actions';
import { ArticleInterface } from '../../../types/article.interface';

@Injectable()
export class RemoveFromFavoritesEffects {
  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesActions.removeFromFavorites),
      switchMap(({ slug }) => {
        return this.addToFavoritesService.toUnfavorite(slug).pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.removeFromFavoritesSuccess({
              article,
            });
          }),
          catchError(() => {
            return of(addToFavoritesActions.removeFromFavoritesFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoreitesService
  ) {}
}
