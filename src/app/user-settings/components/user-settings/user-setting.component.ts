import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { BackendErrorMessagesComponent } from '../../../shared/backend-error-messages/components/backend-error-messages.component';
import CurrentUserInputInterface from '../../../shared/types/current-user-input.interface';
import { authActions } from '../../../auth/store/auth.actions';

@Component({
  selector: 'mc-user-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    BackendErrorMessagesComponent,
    AsyncPipe,
  ],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.scss',
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  public currentUser!: CurrentUserInterface;
  public currentUserSubscription!: Subscription;
  public form!: FormGroup;
  public isSubmiting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
    this.initializeValues();
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(authFeature.selectCurrentUser), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeValues(): void {
    this.isSubmiting$ = this.store.select(
      userSettingsFeature.selectIsSubmitting
    );
    this.backendErrors$ = this.store.select(
      userSettingsFeature.selectValidationErrors
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  onSubmit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };

    this.store.dispatch(authActions.updateCurrentUser({ currentUserInput }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
