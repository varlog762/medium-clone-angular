import { Component } from '@angular/core';

import { FeedComponent } from '../feed/feed.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
  public apiUrl = '/articles';
}
