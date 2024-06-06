import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';

import { ArticleCommentsService } from '../../services/article-comments.service';
import { articleCommentsActions } from '../actions/article-comments.actions';
import { CommentInterface } from '../../types/comment.interface';

@Injectable()
export class GetArticleCommentsEffects {
  getArticleComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleCommentsActions.getComments),
      switchMap(({ articleSlug }) => {
        return this.articleCommentsService.getComments(articleSlug).pipe(
          map((comments: CommentInterface[]) => {
            return articleCommentsActions.getCommentsSuccess({ comments });
          }),
          catchError(() => {
            return of(articleCommentsActions.getCommentsFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private articleCommentsService: ArticleCommentsService
  ) {}
}
