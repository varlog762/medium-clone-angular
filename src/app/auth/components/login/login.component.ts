import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store, StoreModule, select } from '@ngrx/store';

import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { authFeature } from '../../store/auth.state';
import { BackendErrorMessagesComponent } from '../../../shared/backend-error-messages/components/backend-error-messages.component';
import { LoginRequestInterface } from '../../types/login-request.interface';
import { AuthActions } from '../../store/auth.actions';

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    StoreModule,
    AsyncPipe,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(authFeature.selectIsSubmitting)
    );
    this.backendErrors$ = this.store.pipe(
      select(authFeature.selectValidationErrors)
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(AuthActions.login({ request }));
  }
}
