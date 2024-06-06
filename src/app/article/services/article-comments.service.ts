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

  getComments(slug: string): Observable<CommentInterface[]> {
    return this.http
      .get<GetMultipleCommentsResponseInterface>(`/articles/${slug}/comments`)
      .pipe(
        map(
          (response: GetMultipleCommentsResponseInterface) => response.comments
        )
      );
  }

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

  deleteComment(slug: string, id: number): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/comments/${id}`);
  }
}
