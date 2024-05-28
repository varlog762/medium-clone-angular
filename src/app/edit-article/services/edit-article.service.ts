import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleInterface } from '../../shared/types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  constructor(private http: HttpClient) {}

  editArticle(slug: string): Observable<ArticleInterface> {
    return this.http.put<ArticleInterface>('articles', slug);
  }
}
