import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ActionTypes } from '../actionTypes';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) =>
            registerSuccessAction({ currentUser })
          ),
          catchError(() => of(registerFailureAction()))
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
