import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store, StoreModule, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { authFeature } from '../../store/auth.state';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { BackendErrorMessagesComponent } from '../../../shared/backend-error-messages/components/backend-error-messages.component';
import { authActions } from '../../store/auth.actions';

/**
 * This component represents the user registration page.
 * It provides:
 * - A form with fields for username, email, and password.
 * - Validation error messages if registration fails.
 * - A link to navigate to the login page for existing users.
 *
 * The component uses:
 * - Reactive forms for managing form state.
 * - NgRx for state management and handling registration actions.
 */
@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    StoreModule,
    AsyncPipe,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  /** Reactive form group for managing the registration form */
  public form!: FormGroup;

  /** Observable for tracking form submission status */
  public isSubmitting$!: Observable<boolean>;

  /** Observable for tracking backend validation errors */
  public backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  /**
   * Initializes the component.
   * - Sets up the reactive form for registration.
   * - Initializes the Observables for tracking form submission status and backend validation errors.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  /**
   * Initializes the Observables for tracking form submission status
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
   * Initializes the reactive form for registration.
   * - Creates a form group with the following fields:
   *   - username: empty string
   *   - email: empty string
   *   - password: empty string
   */
  initializeForm(): void {
    this.form = this.fb.group({
      username: '',
      email: '',
      password: '',
    });
  }

  /**
   * Submits the registration form.
   * - Creates a request object with the username, email, and password from the form.
   * - Dispatches the register action with the request object.
   */
  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(authActions.register({ request }));
  }
}
