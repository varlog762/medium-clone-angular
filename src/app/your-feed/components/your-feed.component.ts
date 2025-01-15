import { Component } from '@angular/core';

import { FeedComponent } from '../../shared/feed/components/feed.component';
import { BannerComponent } from '../../shared/banner/components/banner.component';
import { PopularTagsComponent } from '../../shared/popular-tags/components/popular-tags.component';
import { FeedTogglerComponent } from '../../shared/feed-toggler/components/feed-toggler.component';

/**
 * Component responsible for displaying the feed of articles authored by users
 * that the current user is following. This component is accessible only to authenticated users.
 */
@Component({
  selector: 'mc-your-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrl: './your-feed.component.scss',
})
export class YourFeedComponent {
  /**
   * The API endpoint for retrieving the feed of articles from authors
   * followed by the current user.
   */
  apiUrl = '/articles/feed';
}
