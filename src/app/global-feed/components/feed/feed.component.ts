import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeedActions } from '../../store/actions/feed.actions';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrl!: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FeedActions.getFeed({ url: this.apiUrl }));
  }
}
