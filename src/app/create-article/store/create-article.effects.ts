import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';

import { ArticleInterface } from '../../shared/types/article.interface';
import { CreateArticleService } from '../services/create-article.service';
import { createArticleActions } from './create-article.actions';
import { DefaultErrorValuesEnum } from '../../shared/enums/default-error-values.enum';

@Injectable()
export class CreateArticleEffects {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleActions.createArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createArticleActions.createArticleFailure({
                errors: errorResponse.error.errors ?? {
                  createArticle: [
                    DefaultErrorValuesEnum.DEFAULT_CREATE_ARTICLE_ERROR,
                  ],
                },
              })
            )
          )
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleActions.createArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
