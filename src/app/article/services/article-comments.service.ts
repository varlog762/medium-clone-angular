import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { CommentInterface } from '../types/comment.interface';
import { GetMultipleCommentsResponseInterface } from '../types/get-multiple-comments-response.interface';
import { AddCommentRequestInterface } from '../types/add-comment-request.interface';
import { GetSingleCommentResponseInterface } from '../types/get-single-comment-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleCommentsService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the list of comments for a given article.
   *
   * @param slug - The unique identifier for the article.
   * @returns An observable that emits an array of CommentInterface objects.
   */

  getComments(slug: string): Observable<CommentInterface[]> {
    return this.http
      .get<GetMultipleCommentsResponseInterface>(`/articles/${slug}/comments`)
      .pipe(
        map(
          (response: GetMultipleCommentsResponseInterface) => response.comments
        )
      );
  }

  /**
   * Adds a new comment to a specified article.
   *
   * @param slug - The unique identifier for the article to which the comment will be added.
   * @param commentInput - The content of the comment to be added.
   * @returns An observable that emits the added CommentInterface object.
   */

  addComment(
    slug: string,
    commentInput: AddCommentRequestInterface
  ): Observable<CommentInterface> {
    return this.http
      .post<GetSingleCommentResponseInterface>(
        `/articles/${slug}/comments`,
        commentInput
      )
      .pipe(
        map((response: GetSingleCommentResponseInterface) => response.comment)
      );
  }

  /**
   * Deletes a comment from the specified article.
   *
   * @param slug - The unique identifier for the article from which the comment will be deleted.
   * @param id   - The unique identifier for the comment to be deleted.
   * @returns An observable that emits nothing.
   */
  deleteComment(slug: string, id: number): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/comments/${id}`);
  }
}
