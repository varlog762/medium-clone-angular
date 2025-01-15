import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

import { addToFollowActions } from '../../store/add-to-follow.actions';
import { addToFollowFeature } from '../../store/add-to-follow.state';

/**
 * Component that provides functionality to follow or unfollow a specific author.
 * It updates the follow state dynamically and handles user interaction based on
 * the authentication status.
 */
@Component({
  selector: 'mc-add-to-follow',
  standalone: true,
  imports: [],
  templateUrl: './add-to-follow.component.html',
  styleUrl: './add-to-follow.component.scss',
})
export class AddToFollowComponent implements OnInit, OnDestroy {
  /**
   * Indicates if the current user is already following the author.
   */
  @Input({ alias: 'isFollowed' }) isFollowedProps!: boolean;

  /**
   * The username of the author to follow or unfollow.
   */
  @Input({ alias: 'username' }) usernameProps!: string;

  /**
   * Indicates if the current user is logged in.
   */
  @Input({ alias: 'isLoggedIn' }) isLoggedInProps!: boolean | null;

  store = inject(Store);
  router = inject(Router);

  /**
   * Tracks the current follow state of the author.
   */
  isFollowed!: boolean;

  /**
   * Subscription to listen for updates to the follow state in the store.
   */
  isFollowedSubscription!: Subscription;

  /**
   * Lifecycle hook to initialize component state and listeners.
   */
  ngOnInit(): void {
    this.initializeListeners();
  }

  /**
   * Initializes the component's event listeners.
   *
   * This method is used to subscribe to changes in the current user's
   * follow state. It updates the component's `isFollowed` state when the
   * follow state is changed.
   *
   * @returns void
   */
  initializeListeners(): void {
    this.isFollowedSubscription = this.store
      .select(addToFollowFeature.selectIsFollowed)
      .subscribe((isFollowed: boolean | null) => {
        this.isFollowed = isFollowed ?? this.isFollowedProps;
      });
  }

  /**
   * Handles the click event on the follow button.
   *
   * If the user is authenticated, it dispatches an action to follow or unfollow
   * the author. If the user is not authenticated, it redirects to the login page.
   *
   * @returns void
   */
  handleFollowing(): void {
    if (this.isLoggedInProps) {
      this.store.dispatch(
        addToFollowActions.followUser({
          username: this.usernameProps,
          isFollowed: this.isFollowed,
        })
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  /**
   * Unsubscribes from the current user's follow state subscription to prevent
   * memory leaks when the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy(): void {
    this.isFollowedSubscription.unsubscribe();
  }
}
