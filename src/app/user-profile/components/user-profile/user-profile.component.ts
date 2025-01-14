import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ProfileInterface } from '../../../shared/types/profile.interface';
import { userProfileActions } from '../../store/user-profile.actions';
import { userProfileFeature } from '../../store/user-profile.state';
import { authFeature } from '../../../auth/store/auth.state';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { FeedComponent } from '../../../shared/feed/components/feed.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { AddToFollowComponent } from '../../../shared/add-to-follow/components/add-to-follow/add-to-follow.component';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';

/**
 * The UserProfileComponent is responsible for displaying information about a user's profile.
 * It includes the user's details (username, bio, profile image) and their articles.
 * Additionally, it allows navigation between the user's articles and their favorited articles.
 * The component also handles the logic for following/unfollowing users.
 */
@Component({
  selector: 'mc-user-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    FeedComponent,
    LoadingComponent,
    AddToFollowComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  /** Dependencies */
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);

  /** Holds the slug (username) of the profile being viewed. */
  slug!: string;

  /** Stores the user's profile data. */
  userProfile!: ProfileInterface;

  /** Subscription for profile data updates. */
  userProfileSubscription!: Subscription;

  /** Indicates whether the current user is following the profile being viewed. */
  isFollowed!: boolean;

  /**  Indicates whether the profile data is currently being loaded. */
  isLoading$!: Observable<boolean>;

  /** Indicates whether there was an error fetching the profile data. */
  error$!: Observable<string | null>;

  /** The API endpoint for fetching user profile data. */
  apiUrl!: string;

  /** Observable that indicates whether the current user is the profile being viewed. */
  isCurrentUserProfile$!: Observable<boolean>;

  /** Subscription for route parameters updates. */
  routeParamsSubscription!: Subscription;

  /** Observable that indicates whether the current user is logged in. */
  isLoggedIn$!: Observable<boolean | null>;

  /** Default user image URL. */
  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE;

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound
   * properties of a directive.
   *
   * This method is used to initialize the component's state and subscribe to
   * route parameter changes.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  /**
   * Initializes the component's state.
   *
   * This method is used to set the `slug` property to the value of the route
   * parameter `slug`, and to initialize the Observables for tracking the
   * loading state, error state and whether the current user is the profile
   * being viewed.
   *
   * @returns void
   */
  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
    this.isLoading$ = this.store.pipe(
      select(userProfileFeature.selectIsLoading)
    );
    this.error$ = this.store.pipe(select(userProfileFeature.selectError));

    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(
        select(userProfileFeature.selectProfile),
        filter(Boolean)
      ),
      this.store.pipe(select(authFeature.selectCurrentUser), filter(Boolean)),
    ]).pipe(
      map(
        ([userProfile, currentUser]: [
          ProfileInterface,
          CurrentUserInterface
        ]) => {
          return userProfile.username === currentUser.username;
        }
      )
    );
  }

  /**
   * Initializes the component's event listeners.
   *
   * This method is used to subscribe to changes in the route parameters and
   * to changes in the current user's profile. It updates the component's state
   * when the route parameters are changed, and when the current user's profile
   * is updated.
   *
   * @returns void
   */
  initializeListeners(): void {
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.slug = params['slug'];
        this.fetchUserProfile();
      }
    );
    this.userProfileSubscription = this.store
      .pipe(select(userProfileFeature.selectProfile), filter(Boolean))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
        this.isFollowed = userProfile.following;
      });
  }

  /**
   * Dispatches an action to fetch the user profile data from the API.
   *
   * This method is used to fetch the user profile data when the component is
   * initialized or when the route parameters are changed.
   *
   * @returns void
   */
  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }

  /**
   * Constructs the API URL for fetching the user's articles.
   *
   * The API endpoint depends on whether the user is viewing their own
   * articles or their favorited articles. If the user is viewing their
   * favorited articles, the API endpoint is `/articles?favorited=${this.slug}`.
   * Otherwise, the API endpoint is `/articles?author=${this.slug}`.
   *
   * @returns The API URL for fetching the user's articles.
   */
  getApiUrl(): string {
    const isFavorited = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorited
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  /**
   * Cleans up the component by unsubscribing from the route parameter
   * changes and the user profile data when the component is destroyed.
   *
   * @returns void
   */
  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }
}
