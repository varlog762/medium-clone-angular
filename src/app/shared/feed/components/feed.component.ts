import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import queryString from 'query-string';

import { FeedActions } from '../store/feed.actions';
import { GetFeedResponseInterface } from '../types/get-feed-response.interface';
import { feedFeature } from '../store/feed.state';
import { ErrorMessageComponent } from '../../../global-feed/components/error-message/error-message.component';
import { LoadingComponent } from '../../../global-feed/components/loading/loading.component';
import { environment } from '../../../../environments/environment.development';
import { PaginationComponent } from '../../../global-feed/components/pagination/pagination.component';
import { TagListCompoinent } from '../../../global-feed/components/tag-list/tag-list.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListCompoinent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrl!: string;

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public feed$!: Observable<GetFeedResponseInterface | null>;

  public limit = environment.limit;
  public baseUrl!: string;
  public currentPage!: number;
  public paramsSubscribe$!: Subscription;

  public testTagsCollection = ['angular', 'js', 'web-dev'];

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

    this.store.dispatch(FeedActions.getFeed({ url: apiUrlWithParams }));
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
