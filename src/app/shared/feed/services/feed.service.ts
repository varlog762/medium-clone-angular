import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { GetFeedResponseInterface } from '../types/get-feed-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    return this.http.get<GetFeedResponseInterface>(url);
  }
}
