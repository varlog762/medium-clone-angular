import { Component, OnDestroy, OnInit } from '@angular/core';
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
  slug!: string;
  userProfile!: ProfileInterface;
  userProfileSubscription!: Subscription;
  isFollowed!: boolean;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  apiUrl!: string;
  isCurrentUserProfile$!: Observable<boolean>;
  routParamsSubscription!: Subscription;
  isLoggedIn$!: Observable<boolean | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

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

  initializeListeners(): void {
    this.routParamsSubscription = this.route.params.subscribe(
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

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorited = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorited
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  ngOnDestroy(): void {
    this.routParamsSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }
}
