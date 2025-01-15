import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import { authFeature } from '../../../auth/store/auth.state';

/**
 * FeedTogglerComponent provides a tabbed interface for switching between different feeds:
 * - "Global Feed" for all articles
 * - "Your Feed" for articles from followed authors (available only for authenticated users)
 * - A tag-specific feed, displaying articles tagged with a specific tag
 * The component dynamically adapts its UI based on user authentication status and the presence of a tag.
 */
@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent implements OnInit {
  /** Name of the tag to filter the feed by. If null, the tag feed tab is not displayed. */
  @Input('tagName') tagName!: string | null;

  store = inject(Store);

  /** Observable to track the authentication state of the user. */
  isLoggedIn$!: Observable<boolean | null>;

  /**
   * Initializes the observable for user authentication status by selecting
   * the state from the NgRx store.
   */
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  }
}
