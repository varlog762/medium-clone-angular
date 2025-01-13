import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { ArticleInputInterface } from '../../shared/types/article-input.interface';
import { ArticleInterface } from '../../shared/types/article.interface';
import { SaveArticleInterface } from '../../shared/types/save-article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  /**
   * Submits a new article to the API to be created.
   * @param articleInput The input data for the article form.
   * @returns An Observable of the created article, or an error if the submission fails.
   */
  createArticle(
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    return this.http
      .post<SaveArticleInterface>('/articles', {
        article: articleInput,
      })
      .pipe(map((response: SaveArticleInterface) => response.article));
  }
}
