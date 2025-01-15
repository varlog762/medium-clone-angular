import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { PopularTagType } from '../../types/popular-tag.type';
import { popularTagsActions } from '../store/popular-tags.actions';
import { popularTagsFeature } from '../store/popular-tags.state';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

/**
 * PopularTagsComponent is responsible for displaying a list of popular tags.
 * It fetches the tags data from the store using NgRx, handles loading and error states,
 * and displays the tags as clickable links.
 *
 * Features:
 * - Shows a loading indicator while data is being fetched.
 * - Displays an error message if fetching tags fails.
 * - Renders a list of tags if available.
 */
@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, ErrorMessageComponent, RouterLink],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  store = inject(Store);

  /** Observable containing the list of popular tags or null if not loaded. */
  tags$!: Observable<PopularTagType[] | null>;

  /** Observable indicating whether the tags data is currently being loaded. */
  isLoading$!: Observable<boolean>;

  /** Observable containing an error message if loading tags fails. */
  error$!: Observable<string | null>;

  /**
   * Lifecycle hook: Called after the component is initialized.
   * It fetches the data for popular tags and initializes observables.
   */
  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  /**
   * Initializes the observables for popular tags, loading state, and error state.
   */
  initializeValues(): void {
    this.tags$ = this.store.select(popularTagsFeature.selectTags);
    this.isLoading$ = this.store.select(popularTagsFeature.selectIsLoading);
    this.error$ = this.store.select(popularTagsFeature.selectError);
  }

  /**
   * Dispatches an action to fetch the list of popular tags from the backend.
   */
  fetchData(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
