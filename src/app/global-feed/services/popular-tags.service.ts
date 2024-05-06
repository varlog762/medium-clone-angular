import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { PopularTagType } from '../../shared/types/popular-tag.type';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = 'tags';

    return this.http.get<PopularTagType[]>(url);
  }
}
