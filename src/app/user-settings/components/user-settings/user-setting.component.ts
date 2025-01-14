import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable } from 'rxjs/internal/Observable';

import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { authFeature } from '../../../auth/store/auth.state';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { userSettingsFeature } from '../../store/user-setting.state';
import { BackendErrorMessagesComponent } from '../../../shared/backend-error-messages/components/backend-error-messages.component';
import CurrentUserInputInterface from '../../../shared/types/current-user-input.interface';
import { authActions } from '../../../auth/store/auth.actions';

/**
 * The UserSettingsComponent is responsible for displaying a form
 * that allows the current user to update their profile information.
 * It also includes a button for logging out of the account.
 *
 * Key Features:
 * - Pre-populates the form with the user's current data.
 * - Validates form inputs, requiring the "New Password" field to be filled.
 * - Handles form submission to update the user's profile via NgRx actions.
 * - Displays validation errors if any occur during the update.
 */
@Component({
  selector: 'mc-user-settings',
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorMessagesComponent, AsyncPipe],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  /** Dependency injection */
  fb = inject(FormBuilder);
  store = inject(Store);

  /**
   * Stores the details of the current user, such as username, email, bio, etc.
   * This is used to populate the form and update user settings.
   */
  currentUser!: CurrentUserInterface;

  /**
   * Subscription to listen for changes to the current user's data in the store.
   * Automatically updates the form when the current user's information changes.
   */
  currentUserSubscription!: Subscription;

  /**
   * Reactive form group for handling user input in the settings form.
   * Includes controls for image, username, bio, email, and password fields.
   */
  form!: FormGroup;

  /**
   * Observable indicating whether the form submission process is in progress.
   * Used to disable the submit button during submission.
   */
  isSubmitting$!: Observable<boolean>;

  /**
   * Observable that holds validation errors returned from the backend during form submission.
   * Displays error messages if the submission fails.
   */
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  /**
   * Initializes the component.
   * - Initializes the Observables for tracking form submission status and backend validation errors.
   * - Subscribes to changes in the current user's data from the store.
   * @returns void
   */
  ngOnInit(): void {
    this.initializeListeners();
    this.initializeValues();
  }

  /**
   * Subscribes to changes in the current user's data from the store.
   *
   * This method initializes a subscription to the current user's observable,
   * updating the component's `currentUser` property and re-initializing the form
   * with the latest data whenever the user information changes.
   *
   * @returns void
   */
  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(authFeature.selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  /**
   * Initializes the observables for tracking the form submission status
   * and any validation errors from the backend.
   *
   * The `isSubmitting$` observable is used to monitor if the form is currently
   * being submitted, which can be used to disable the submit button to prevent
   * multiple submissions. The `backendErrors$` observable holds any validation
   * errors returned from the backend, allowing the display of error messages
   * to the user.
   *
   * @returns void
   */
  initializeValues(): void {
    this.isSubmitting$ = this.store.select(
      userSettingsFeature.selectIsSubmitting
    );
    this.backendErrors$ = this.store.select(
      userSettingsFeature.selectValidationErrors
    );
  }

  /**
   * Initializes the reactive form for the user settings.
   * The form is created with fields for the user's image, username, bio, email, and password.
   * The values of the form fields are initialized with the current user's data,
   * and the password field is initialized with an empty string.
   *
   * @returns void
   */
  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  /**
   * Submits the user settings form to update the current user's data.
   *
   * When the form is submitted, the component creates a new `currentUserInput`
   * object by merging the current user's data with the form values. The
   * `updateCurrentUser` action is then dispatched with the `currentUserInput`
   * object as the payload. This triggers the update process in the store and
   * will update the user's information if the submission is successful.
   *
   * @returns void
   */
  onSubmit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };

    this.store.dispatch(authActions.updateCurrentUser({ currentUserInput }));
  }

  /**
   * Dispatches the logout action to log the user out.
   *
   * @returns void
   */
  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  /**
   * Unsubscribes from the current user subscription to prevent memory leaks
   * when the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
