import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ProfileInterface } from '../../types/profile.interface';
import { GetProfileResponseInterface } from '../../../user-profile/types/get-profile-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFollowService {
  constructor(private http: HttpClient) {}

  followUser(slug: string): Observable<ProfileInterface> {
    return this.http
      .post<GetProfileResponseInterface>(this.getApiUrl(slug), {})
      .pipe(map((response: GetProfileResponseInterface) => response.profile));
  }

  unfollowUser(slug: string): Observable<ProfileInterface> {
    return this.http
      .delete<GetProfileResponseInterface>(this.getApiUrl(slug))
      .pipe(map((response: GetProfileResponseInterface) => response.profile));
  }

  getApiUrl(slug: string): string {
    return `/profiles/${slug}/follow`;
  }
}
