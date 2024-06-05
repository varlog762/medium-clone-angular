import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';

import { ProfileInterface } from '../../types/profile.interface';
import { AddToFollowService } from '../services/add-to-follow.service';
import { addToFollowActions } from './add-to-follow.actions';

@Injectable()
export class AddToFollowEffects {
  addToFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFollowActions.followUser),
      switchMap(({ slug, isFollowed }) => {
        const stream$ = isFollowed
          ? this.addToFollowService.unfollowUser(slug)
          : this.addToFollowService.followUser(slug);

        return stream$.pipe(
          map((profile: ProfileInterface) => {
            return addToFollowActions.followUserSuccess({ profile });
          }),
          catchError(() => {
            return of(addToFollowActions.followUserFailure());
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
