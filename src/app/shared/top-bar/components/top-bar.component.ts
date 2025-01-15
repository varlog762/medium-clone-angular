import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import { CurrentUserInterface } from '../../types/current-user.interface';
import { authFeature } from '../../../auth/store/auth.state';
import { ConstantsEnum } from '../../enums/constants.enum';

/**
 * TopBarComponent is responsible for rendering the navigation bar (header) of the application.
 * It displays different sets of controls based on whether the user is logged in or anonymous.
 * The component handles user authentication states and shows appropriate options like:
 * - "New Post" (for logged-in users)
 * - "Sign In" and "Sign Up" (for anonymous users)
 * - User profile settings and logout options.
 */
@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  store = inject(Store);

  /**
   * Observable representing the user's login status (true for logged in, false for not logged in)
   */
  isLoggedIn$!: Observable<boolean | null>;

  /**
   * Observable representing if the user is anonymous (for users who have not logged in)
   */
  isAnonymous$!: Observable<boolean>;

  /**
   * Observable representing the current user
   */
  currentUser$!: Observable<CurrentUserInterface | null>;

  /**
   * Default user image used when the user has not set a profile image
   */
  defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE;

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound
   * properties of a directive.
   *
   * This method is used to initialize the Observables for tracking the
   * user's login status, whether the user is anonymous, and the current user.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
    this.isAnonymous$ = this.store.select(authFeature.selectIsAnonymous);
    this.currentUser$ = this.store.select(authFeature.selectCurrentUser);
  }
}
