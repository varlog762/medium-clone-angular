import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';

import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../auth.actions';
import { DefaultErrorValuesEnum } from '../../../shared/enums/default-error-values.enum';

@Injectable()
export class UpdateCurrentUserEffects {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.updateCurrentUserSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.updateCurrentUserFailure({
                errors: errorResponse.error.errors ?? {
                  currentUser: [
                    DefaultErrorValuesEnum.DEFAULT_UPDATE_CURRENT_USER_ERROR,
                  ],
                },
              })
            );
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
