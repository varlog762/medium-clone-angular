import { Component } from '@angular/core';

import { FeedComponent } from '../../../shared/components/feed/feed.component';

@Component({
  selector: 'mc-global-feed',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {}
