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

  getPopularTags(): Observable<PopularTagType[]> {
    const url = '/tags';

    return this.http
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags));
  }
}
