import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { GetFeedResponseInterface } from '../types/get-feed-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  /**
   * Makes a GET request to the given URL and returns an observable of the response.
   * The response is expected to be in the format of GetFeedResponseInterface.
   * @param url The URL of the API endpoint to query.
   */
  getFeed(url: string): Observable<GetFeedResponseInterface> {
    return this.http.get<GetFeedResponseInterface>(url);
  }
}
