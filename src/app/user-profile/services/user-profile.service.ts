import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ProfileInterface } from '../../shared/types/profile.interface';
import { GetProfileResponseInterface } from '../types/get-profile-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<ProfileInterface> {
    return this.http
      .get<GetProfileResponseInterface>(`/profiles/${slug}`)
      .pipe(map((response: GetProfileResponseInterface) => response.profile));
  }
}
