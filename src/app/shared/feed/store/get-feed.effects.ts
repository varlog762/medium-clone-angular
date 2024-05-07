import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

import { FeedActions } from './feed.actions';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../types/get-feed-response.interface';

@Injectable()
export class GetFeedEffects {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.getFeed),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return FeedActions.getFeedSuccess({ feed });
          }),
          catchError(() => of(FeedActions.getFeedFailure()))
        );
      })
    )
  );

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
