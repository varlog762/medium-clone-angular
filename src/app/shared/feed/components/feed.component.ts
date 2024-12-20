import {
  Component,
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
  @Input('apiUrl') apiUrl!: string;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  feed$!: Observable<GetFeedResponseInterface | null>;
  isLoggedIn$!: Observable<boolean | null>;

  limit = ConstantsEnum.LIMIT_ARTICLES_PER_PAGE as number;
  baseUrl!: string;
  currentPage!: number;
  paramsSubscribe$!: Subscription;

  defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(feedFeature.selectIsLoading);
    this.error$ = this.store.select(feedFeature.selectError);
    this.feed$ = this.store.select(feedFeature.selectData);
    this.baseUrl = this.router.url.split('?')[0];
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  }

  initializeListeners(): void {
    this.paramsSubscribe$ = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = +(params['page'] ?? 1);
        this.fetchFeed();
      }
    );
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscribe$.unsubscribe();
  }
}
