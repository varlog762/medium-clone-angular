import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { PopularTagType } from '../../../shared/types/popular-tag.type';
import { PopularTagsActions } from '../../store/actions/popular-tags.actions';
import { popularTagsFeature } from '../../store/features/popular-tags.feature';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  public tags$!: Observable<PopularTagType[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PopularTagsActions.getPopularTags());
    this.tags$ = this.store.select(popularTagsFeature.selectTags);
  }
}
