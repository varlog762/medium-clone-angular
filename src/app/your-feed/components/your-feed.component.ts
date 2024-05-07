import { Component } from '@angular/core';

import { FeedComponent } from '../../global-feed/components/feed/feed.component';
import { BannerComponent } from '../../global-feed/components/banner/banner.component';
import { PopularTagsComponent } from '../../global-feed/components/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../../global-feed/components/feed-toggler/feed-toggler.component';

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
  public apiUrl = '/articles/feed';
}
