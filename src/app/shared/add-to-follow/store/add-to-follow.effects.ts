import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { userProfileActions } from '../../../user-profile/store/user-profile.actions';
import { ProfileInterface } from '../../types/profile.interface';
import { AddToFollowService } from '../services/add-to-follow.service';

@Injectable()
export class AddToFollowEffects {
  addToFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.followUser),
      switchMap(({ slug, isFollowed }) => {
        const stream$ = isFollowed
          ? this.addToFollowService.unfollowUser(slug)
          : this.addToFollowService.followUser(slug);

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
    private addToFollowService: AddToFollowService
  ) {}
}
