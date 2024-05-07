import { Component } from '@angular/core';

import { FeedComponent } from '../../shared/feed/components/feed.component';
import { BannerComponent } from '../../shared/banner/components/banner.component';
import { PopularTagsComponent } from '../../shared/popular-tags/components/popular-tags.component';
import { FeedTogglerComponent } from '../../shared/feed-toggler/components/feed-toggler.component';

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
export class TagFeedComponent {
  public apiUrl = '/';
}
