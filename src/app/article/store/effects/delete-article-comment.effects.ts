import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';

import { ArticleCommentsService } from '../../services/article-comments.service';
import { articleCommentsActions } from '../actions/article-comments.actions';

@Injectable()
export class DeleteArticleCommentEffects {
  actions$ = inject(Actions);
  articleCommentsService = inject(ArticleCommentsService);

  deleteArticleComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleCommentsActions.deleteComment),
      switchMap(({ articleSlug, commentId }) => {
        return this.articleCommentsService
          .deleteComment(articleSlug, commentId)
          .pipe(
            map(() => {
              return articleCommentsActions.deleteCommentSuccess({ commentId });
            }),
            catchError(() => {
              return of(articleCommentsActions.deleteCommentFailure());
            })
          );
      })
    )
  );
}
