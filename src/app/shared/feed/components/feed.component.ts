import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import queryString from 'query-string';

import { feedActions } from '../store/feed.actions';
import { GetFeedResponseInterface } from '../types/get-feed-response.interface';
import { feedFeature } from '../store/feed.state';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { LoadingComponent } from '../../loading/loading.component';
import { PaginationComponent } from '../../../global-feed/components/pagination/pagination.component';
import { TagListComponent } from '../../tag-list/tag-list.component';
import { ConstantsEnum } from '../../enums/constants.enum';
import { AddToFavoritesComponent } from '../../add-to-favorites/components/add-to-favorites/add-to-favorites.component';
import { authFeature } from '../../../auth/store/auth.state';

/**
 * FeedComponent is responsible for rendering a list of articles fetched from the backend.
 * It handles pagination, displays article metadata, and integrates features like "add to favorites."
 * The component supports dynamic updates when the API URL changes and provides loading/error states.
 */
@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  /** API endpoint to fetch the articles feed. Can include query parameters. */
  @Input('apiUrl') apiUrl!: string;

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  /** Observable for tracking the loading state of the feed data. */
  isLoading$!: Observable<boolean>;

  /** Observable for tracking errors during feed data fetching. */
  error$!: Observable<string | null>;

  /** Observable for accessing the feed data (articles and total count). */
  feed$!: Observable<GetFeedResponseInterface | null>;

  /** Observable for checking the authentication state of the user. */
  isLoggedIn$!: Observable<boolean | null>;

  /** Number of articles to display per page. */
  limit = ConstantsEnum.LIMIT_ARTICLES_PER_PAGE as number;

  /** Base URL for pagination, derived from the current route. */
  baseUrl!: string;

  /** Current page number, derived from query parameters. */
  currentPage!: number;

  /** Subscription to query parameter changes for dynamic pagination. */
  paramsSubscribe$!: Subscription;

  /** Default image URL for users without a profile picture. */
  defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE;

  /**
   * Initializes observables and default values.
   */
  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  /**
   * Sets up the initial values for observables and other state variables.
   */
  initializeValues(): void {
    this.isLoading$ = this.store.select(feedFeature.selectIsLoading);
    this.error$ = this.store.select(feedFeature.selectError);
    this.feed$ = this.store.select(feedFeature.selectData);
    this.baseUrl = this.router.url.split('?')[0];
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  }

  /**
   * Subscribes to query parameter changes and triggers a feed fetch on update.
   */
  initializeListeners(): void {
    this.paramsSubscribe$ = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = +(params['page'] ?? 1);
        this.fetchFeed();
      }
    );
  }

  /**
   * Fetches the articles feed based on the current page and API URL.
   */
  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }

  /**
   * Triggers a feed fetch if the API URL input property changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  /**
   * Cleans up subscriptions to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.paramsSubscribe$.unsubscribe();
  }
}
