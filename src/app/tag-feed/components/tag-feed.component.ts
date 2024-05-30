import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

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
export class TagFeedComponent implements OnInit, OnDestroy {
  public tagName!: string | null;
  public apiUrl!: string;
  public paramsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
