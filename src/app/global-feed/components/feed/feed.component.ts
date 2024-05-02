import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { FeedActions } from '../../store/actions/feed.actions';
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface';
import { feedFeature } from '../../store/feed.feature';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from '../../../../environments/environment.development';
import { Subscription } from 'rxjs/internal/Subscription';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrl!: string;

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public feed$!: Observable<GetFeedResponseInterface | null>;

  public limit = environment.limit;
  public baseUrl!: string;
  public currentPage!: number;
  public paramsSubscribe$!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
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
      (params: Params) => (this.currentPage = +(params['page'] ?? 1))
    );
  }

  fetchData(): void {
    this.store.dispatch(FeedActions.getFeed({ url: this.apiUrl }));
  }

  ngOnDestroy(): void {
    this.paramsSubscribe$.unsubscribe();
  }
}
