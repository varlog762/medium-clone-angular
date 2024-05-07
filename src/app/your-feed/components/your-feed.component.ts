import { Component } from '@angular/core';

import { FeedComponent } from '../../shared/feed/components/feed.component';
import { BannerComponent } from '../../shared/banner/components/banner.component';
import { PopularTagsComponent } from '../../shared/popular-tags/components/popular-tags.component';
import { FeedTogglerComponent } from '../../shared/feed-toggler/components/feed-toggler.component';

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
