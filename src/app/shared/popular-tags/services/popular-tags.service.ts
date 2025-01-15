import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { PopularTagType } from '../../types/popular-tag.type';
import { GetPopularTagsResponseInterface } from '../types/get-popular-tags-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  /**
   * Sends a GET request to retrieve the list of popular tags from the backend.
   *
   * The request is sent to the '/tags' endpoint, which returns a JSON response
   * with a single property called 'tags', containing an array of
   * PopularTagType objects.
   *
   * @returns An observable emitting the array of popular tags.
   */
  getPopularTags(): Observable<PopularTagType[]> {
    const url = '/tags';

    return this.http
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags));
  }
}
