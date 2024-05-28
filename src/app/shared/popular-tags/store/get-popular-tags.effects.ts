import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { popularTagsActions } from './popular-tags.actions';
import { catchError, map, of, switchMap } from 'rxjs';

import { PopularTagsService } from '../services/popular-tags.service';
import { PopularTagType } from '../../types/popular-tag.type';

@Injectable()
export class GetPopularTagsEffects {
  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((tags: PopularTagType[]) =>
            popularTagsActions.getPopularTagsSuccess({ tags })
          ),
          catchError(() => of(popularTagsActions.getPopularTagsFailure()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
