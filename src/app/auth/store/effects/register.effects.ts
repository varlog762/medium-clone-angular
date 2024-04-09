import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ActionTypes } from '../actionTypes';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(
    () => this.actions$.pipe(ofType(ActionTypes.REGISTER)),
    exhaustMap(data => this.authService.register(data)).pipe(map(() => {}))
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
