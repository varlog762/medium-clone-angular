import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { GetArticleResponseInterface } from '../types/get-article-response.interface';
import { ArticleInterface } from '../types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches an article with the given slug from the API.
   * @param slug The slug of the article to be fetched.
   * @returns An Observable of the fetched article.
   */
  getArticle(slug: string): Observable<ArticleInterface> {
    return this.http
      .get<GetArticleResponseInterface>(`/articles/${slug}`)
      .pipe(map((response: GetArticleResponseInterface) => response.article));
  }
}
