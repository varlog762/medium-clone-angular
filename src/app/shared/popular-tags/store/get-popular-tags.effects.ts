import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PopularTagsActions } from './popular-tags.actions';
import { catchError, map, of, switchMap } from 'rxjs';

import { PopularTagsService } from '../services/popular-tags.service';
import { PopularTagType } from '../../types/popular-tag.type';

@Injectable()
export class GetPopularTagsEffects {
  getTags$ = createEffect(() =>
    this.actions.pipe(
      ofType(PopularTagsActions.getPopularTags),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((tags: PopularTagType[]) =>
            PopularTagsActions.getPopularTagsSuccess({ tags })
          ),
          catchError(() => of(PopularTagsActions.getPopularTagsFailure()))
        );
      })
    )
  );

  constructor(
    private actions: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
