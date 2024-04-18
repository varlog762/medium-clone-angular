import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store, StoreModule, select } from '@ngrx/store';

import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { authFeature } from '../../store/auth.feature';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { registerAction } from '../../store/actions/register.action';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';

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
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(registerAction({ request }));
  }
}
