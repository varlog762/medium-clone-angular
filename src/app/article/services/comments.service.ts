import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { CommentInterface } from '../types/comment.interface';
import { GetMultipleCommentsResponseInterface } from '../types/get-multiple-comments-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
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

  addComment(slug: string, body) {
    return this.http.post(`/articles/${slug}/comments`, {});
  }
}
