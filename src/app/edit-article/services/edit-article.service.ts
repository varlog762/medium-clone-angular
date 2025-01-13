import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleInputInterface } from '../../shared/types/article-input.interface';
import { SaveArticleInterface } from '../../shared/types/save-article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  constructor(private http: HttpClient) {}

  /**
   * Updates an existing article.
   * @param slug The slug of the article to be updated.
   * @param articleInput The updated article data.
   * @returns An Observable of the updated article.
   */
  updateArticle(
    slug: string,
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    return this.http
      .put<SaveArticleInterface>(`/articles/${slug}`, {
        article: articleInput,
      })
      .pipe(map((response: SaveArticleInterface) => response.article));
  }
}
