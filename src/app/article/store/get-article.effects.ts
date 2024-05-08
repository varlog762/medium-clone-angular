import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';

import { ArticleActions } from './article.actions';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { ArticleInterface } from '../../shared/types/article.interface';

@Injectable()
export class GetArticleEffects {
  getArticle$ = createEffect(() =>
    this.actions.pipe(
      ofType(ArticleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return ArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => of(ArticleActions.getArticleFailure()))
        );
      })
    )
  );

  constructor(
    private actions: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
