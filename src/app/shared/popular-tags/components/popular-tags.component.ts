import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { PopularTagType } from '../../types/popular-tag.type';
import { PopularTagsActions } from '../store/popular-tags.actions';
import { popularTagsFeature } from '../store/popular-tags.state';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, ErrorMessageComponent, RouterLink],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  public tags$!: Observable<PopularTagType[] | null>;
  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  initializeValues(): void {
    this.tags$ = this.store.select(popularTagsFeature.selectTags);
    this.isLoading$ = this.store.select(popularTagsFeature.selectIsLoading);
    this.error$ = this.store.select(popularTagsFeature.selectError);
  }

  fetchData(): void {
    this.store.dispatch(PopularTagsActions.getPopularTags());
  }
}
