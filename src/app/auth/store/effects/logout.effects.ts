import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/internal/operators/tap';

import { PersistenceService } from '../../../shared/services/persistence.service';
import { authActions } from '../auth.actions';

@Injectable()
export class LogoutEffects {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.persistenceService.delete('accessToken');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
