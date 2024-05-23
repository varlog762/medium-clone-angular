import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { DeleteArticleService } from '../../services/delete-article.service';
import { ArticleActions } from '../article.actions';

@Injectable()
export class DeleteArticleEffects {
  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      switchMap(({ slug }) => {
        return this.deleteArticleService.deleteArticle(slug).pipe(
          map(() => {
            return ArticleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            return of(ArticleActions.deleteArticleFailure());
          })
        );
      })
    )
  );

  redirectAfterDeleteArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ArticleActions.deleteArticleSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private deleteArticleService: DeleteArticleService,
    private router: Router
  ) {}
}
