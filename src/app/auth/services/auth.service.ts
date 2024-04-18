import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { RegisterRequestInterface } from '../types/register-request.interface';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { LoginRequestInterface } from '../types/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/users', data)
      .pipe(map((res: AuthResponseInterface) => res.user));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/users', data)
      .pipe(map((res: AuthResponseInterface) => res.user));
  }
}
