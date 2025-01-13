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
import { authActions } from '../../store/auth.actions';

/**
 * This component represents the login page.
 * It provides:
 * - A form with fields for email and password.
 * - Validation error messages if the login fails.
 * - A link to navigate to the registration page for new users.
 *
 * The component uses:
 * - Reactive forms for handling form state.
 * - NgRx for state management and handling login actions.
 */
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
  /** Reactive form group for managing the login form */
  form!: FormGroup;

  /** Observable to track form submission status */
  isSubmitting$!: Observable<boolean>;

  /** Observable to track backend validation errors */
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  /**
   * Initializes the component.
   * - Sets up the reactive form for login.
   * - Initializes the Observables for tracking form submission status and backend validation errors.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  /**
   * Initializes the observables for tracking form submission status
   * and backend validation errors.
   */
  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(authFeature.selectIsSubmitting)
    );
    this.backendErrors$ = this.store.pipe(
      select(authFeature.selectValidationErrors)
    );
  }

  /**
   * Sets up the reactive form for login.
   * - The form has two fields: email and password.
   * - The fields are initialized with empty values.
   */
  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  /**
   * Submits the login form.
   * - Creates a request object with the email and password from the form.
   * - Dispatches the login action with the request object.
   */
  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(authActions.login({ request }));
  }
}
