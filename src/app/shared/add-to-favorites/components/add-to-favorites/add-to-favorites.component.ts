import { Component, Input } from '@angular/core';

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
}
