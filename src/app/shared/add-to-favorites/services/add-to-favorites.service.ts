import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { ArticleInterface } from '../../types/article.interface';
import { GetArticleResponseInterface } from '../../types/get-article-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  /**
   * Toggles the favorite status of an article with the given slug.
   * If the article was not favorited before, it will be added to the user's favorites.
   * If the article was already favorited, it will be removed from the user's favorites.
   *
   * @param slug The slug of the article to be toggled.
   * @returns The updated article object.
   */
  addToFavorites(slug: string): Observable<ArticleInterface> {
    return this.http
      .post<GetArticleResponseInterface>(`/articles/${slug}/favorite`, {})
      .pipe(map(response => response.article));
  }

  /**
   * Removes the favorite status of an article with the given slug.
   * This will unfavorite the article if it was previously favorited by the user.
   *
   * @param slug The unique identifier of the article to be unfavorited.
   * @returns An observable of the updated article object.
   */

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    return this.http
      .delete<GetArticleResponseInterface>(`/articles/${slug}/favorite`)
      .pipe(map(response => response.article));
  }
}
