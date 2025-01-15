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

  /**
   * Makes a POST request to the API to follow the user with the given slug.
   *
   * @param slug The slug of the user to follow.
   * @returns An observable of the user's updated profile.
   */
  followUser(slug: string): Observable<ProfileInterface> {
    return this.http
      .post<GetProfileResponseInterface>(this.getApiUrl(slug), {})
      .pipe(map((response: GetProfileResponseInterface) => response.profile));
  }

  /**
   * Makes a DELETE request to the API to unfollow the user with the given slug.
   *
   * @param slug The slug of the user to unfollow.
   * @returns An observable of the user's updated profile.
   */
  unfollowUser(slug: string): Observable<ProfileInterface> {
    return this.http
      .delete<GetProfileResponseInterface>(this.getApiUrl(slug))
      .pipe(map((response: GetProfileResponseInterface) => response.profile));
  }

  /**
   * Constructs the API URL for the follow/unfollow endpoint.
   *
   * @param slug The slug of the user to follow/unfollow.
   * @returns The API URL for the follow/unfollow endpoint.
   */
  getApiUrl(slug: string): string {
    return `/profiles/${slug}/follow`;
  }
}
