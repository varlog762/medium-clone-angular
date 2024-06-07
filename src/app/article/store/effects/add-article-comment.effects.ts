import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, of, catchError } from 'rxjs';

import { ArticleCommentsService } from '../../services/article-comments.service';
import { articleCommentsActions } from '../actions/article-comments.actions';
import { CommentInterface } from '../../types/comment.interface';

@Injectable()
export class AddArticleCommentEffects {
  actions$ = inject(Actions);
  service = inject(ArticleCommentsService);

  addArticleComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleCommentsActions.addComment),
      switchMap(({ articleSlug, commentInput }) => {
        const commentBodyRequest = {
          comment: commentInput,
        };

        return this.service.addComment(articleSlug, commentBodyRequest).pipe(
          map((comment: CommentInterface) => {
            return articleCommentsActions.addCommentSuccess({ comment });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              articleCommentsActions.addCommentFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );
}
