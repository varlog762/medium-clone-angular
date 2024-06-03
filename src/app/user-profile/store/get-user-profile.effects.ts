import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { UserProfileService } from '../services/user-profile.service';
import { userProfileActions } from './user-profile.actions';

@Injectable()
export class GetUserProfileEffects {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.getProfile),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map(profile => {
            return userProfileActions.getProfileSuccess({ profile });
          }),
          catchError(() => {
            return of(userProfileActions.getProfileFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}
}
