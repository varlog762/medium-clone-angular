import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { addToFavoritesActions } from '../../store/add-to-favorites.actions';

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent {
  @Input('isFavorited') isFavoritedProps!: boolean;
  @Input('articleSlug') articleSlugProps!: string;
  @Input('favoritesCount') favoritesCountProps!: number;

  constructor(private store: Store) {}

  toggleFavorites(): void {
    this.isFavoritedProps
      ? this.store.dispatch(
          addToFavoritesActions.removeFromFavorites({
            slug: this.articleSlugProps,
          })
        )
      : this.store.dispatch(
          addToFavoritesActions.addToFavorites({ slug: this.articleSlugProps })
        );
  }
}
