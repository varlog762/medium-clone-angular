import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { FeedActions } from '../../store/actions/feed.actions';
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface';
import { feedFeature } from '../../store/feed.feature';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrl!: string;

  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;
  public feed$!: Observable<GetFeedResponseInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(feedFeature.selectIsLoading);
    this.error$ = this.store.select(feedFeature.selectError);
    this.feed$ = this.store.select(feedFeature.selectData);
  }

  fetchData(): void {
    this.store.dispatch(FeedActions.getFeed({ url: this.apiUrl }));
  }
}
