import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { ArticleInterface } from '../../types/article.interface';
import { GetArticleResponseInterface } from '../../types/get-article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoreitesService {
  constructor(private http: HttpClient) {}

  toFavorite(slug: string): Observable<ArticleInterface> {
    return this.http
      .post<GetArticleResponseInterface>(`/articles/${slug}/favorite`, {})
      .pipe(map(response => response.article));
  }

  toUnfavorite(slug: string): Observable<ArticleInterface> {
    return this.http
      .delete<GetArticleResponseInterface>(`/articles/${slug}/favorite`)
      .pipe(map(response => response.article));
  }
}
