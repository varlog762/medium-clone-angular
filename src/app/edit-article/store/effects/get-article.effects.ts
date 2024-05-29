import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';

import { ArticleService as SharedArticleService } from '../../../shared/services/article.service';
import { editArticleActions } from '../edit-article.actions';

@Injectable()
export class GetArticleEffects {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map(article => {
            return editArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => of(editArticleActions.getArticleFailure()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
