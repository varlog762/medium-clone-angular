import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { FeedComponent } from '../../shared/feed/components/feed.component';
import { BannerComponent } from '../../shared/banner/components/banner.component';
import { PopularTagsComponent } from '../../shared/popular-tags/components/popular-tags.component';
import { FeedTogglerComponent } from '../../shared/feed-toggler/components/feed-toggler.component';

/**
 * The TagFeedComponent is responsible for displaying a list of articles
 * associated with a specific tag. It fetches the tag from the route parameters
 * and constructs the API URL for retrieving the articles.
 */
@Component({
  selector: 'mc-tag-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrl: './tag-feed.component.scss',
})
export class TagFeedComponent implements OnInit, OnDestroy {
  /** Holds the current tag name from the route. */
  public tagName!: string | null;

  /** The API endpoint to fetch articles by the tag. */
  public apiUrl!: string;

  /** Subscription for route parameter changes. */
  public paramsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  /**
   * Initializes the component by fetching the tag name from the route
   * parameters and constructing the API URL for retrieving the articles.
   * It also sets up the subscription to route parameter changes.
   */
  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }

  /**
   * Cleans up the component by unsubscribing from the route parameter
   * changes when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
