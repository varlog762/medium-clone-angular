import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import { authFeature } from '../../../auth/store/auth.feature';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagName!: string | null;

  public isLoggedIn$!: Observable<boolean | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  }
}
