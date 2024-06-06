import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';

import { addToFavoritesActions } from '../../store/add-to-favorites.actions';

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps!: boolean;
  @Input('articleSlug') articleSlugProps!: string;
  @Input('favoritesCount') favoritesCountProps!: number;
  @Input('isBigButton') isBigButtonProps!: boolean;

  favoritesCount!: number;
  isFavorited!: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isFavorited = this.isFavoritedProps;
    this.favoritesCount = this.favoritesCountProps;
  }

  handleLikes(): void {
    if (this.isFavorited) {
      this.favoritesCount -= 1;
      this.store.dispatch(
        addToFavoritesActions.removeFromFavorites({
          slug: this.articleSlugProps,
        })
      );
    } else {
      this.favoritesCount += 1;
      this.store.dispatch(
        addToFavoritesActions.addToFavorites({ slug: this.articleSlugProps })
      );
    }

    this.isFavorited = !this.isFavorited;
  }
}
