import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { GetArticleResponseInterface } from '../types/get-article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<GetArticleResponseInterface> {
    return this.http.get<GetArticleResponseInterface>(slug);
  }
}
