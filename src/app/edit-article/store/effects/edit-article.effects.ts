import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, catchError, tap, map, of } from 'rxjs';

import { EditArticleService } from '../../services/edit-article.service';
import { editArticleActions } from '../edit-article.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Injectable()
export class EditArticleEffects {
  editArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({ slug }) => {
        return this.editArticleService.updateArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.updateArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              editArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );

  redirectAfterEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editArticleActions.updateArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['articles', article.slug]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private editArticleService: EditArticleService
  ) {}
}
