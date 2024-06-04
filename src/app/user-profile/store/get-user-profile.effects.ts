import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { GetUserProfileService } from '../services/get-user-profile.service';
import { userProfileActions } from './user-profile.actions';

@Injectable()
export class GetUserProfileEffects {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return this.getUserProfileService.getUserProfile(slug).pipe(
          map(profile => {
            return userProfileActions.getUserProfileSuccess({ profile });
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private getUserProfileService: GetUserProfileService
  ) {}
}
