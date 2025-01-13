import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { RegisterRequestInterface } from '../types/register-request.interface';
import { CurrentUserInterface } from '../../shared/types/current-user.interface';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { LoginRequestInterface } from '../types/login-request.interface';
import CurrentUserInputInterface from '../../shared/types/current-user-input.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Takes an AuthResponseInterface and returns the contained CurrentUserInterface.
   *
   * This abstraction is useful because the same response format is used by the
   * login and register endpoints, but the user object is not part of the response
   * in the same way. This function makes it easy to get the user object from the
   * response of either endpoint.
   *
   * @param response The response from the login or register endpoint.
   * @returns The user object from the response.
   */
  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  /**
   * Sends a request to register a new user.
   *
   * @param data The data of the user to register.
   * @returns An observable of the newly created user.
   */
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/users', data)
      .pipe(map(this.getUser));
  }

  /**
   * Sends a request to login a user.
   *
   * @param data The user's email and password.
   * @returns An observable of the user object if the login is successful.
   */
  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/users/login', data)
      .pipe(map(this.getUser));
  }

  /**
   * Fetches the currently authenticated user's data.
   *
   * @returns An observable of the current user's information.
   */

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http
      .get<AuthResponseInterface>('/user')
      .pipe(map(this.getUser));
  }

  /**
   * Sends a request to update the currently authenticated user's data.
   *
   * @param currentUserInput The user's updated data.
   * @returns An observable of the updated user's information.
   */
  updateCurrentUser(
    currentUserInput: CurrentUserInputInterface
  ): Observable<CurrentUserInterface> {
    return this.http
      .put<AuthResponseInterface>('/user', { user: currentUserInput })
      .pipe(map(this.getUser));
  }
}
