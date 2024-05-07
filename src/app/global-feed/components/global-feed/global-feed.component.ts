import { Component } from '@angular/core';

import { FeedComponent } from '../feed/feed.component';
import { BannerComponent } from '../banner/banner.component';
import { PopularTagsComponent } from '../popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../feed-toggler/feed-toggler.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
  public apiUrl = '/articles';
}
