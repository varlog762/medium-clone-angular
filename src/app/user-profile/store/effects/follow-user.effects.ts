import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { FollowUserService } from '../../services/follow-user.service';
import { userProfileActions } from '../user-profile.actions';
import { ProfileInterface } from '../../../shared/types/profile.interface';

@Injectable()
export class FollowUserEffects {
  followUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.followUser),
      switchMap(({ slug, isFollowed }) => {
        const stream$ = isFollowed
          ? this.followUserService.unfollowUser(slug)
          : this.followUserService.followUser(slug);

        return stream$.pipe(
          map((profile: ProfileInterface) => {
            return userProfileActions.followUserSuccess({ profile });
          }),
          catchError(() => {
            return of(userProfileActions.followUserFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private followUserService: FollowUserService
  ) {}
}
