import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { addToFavoritesActions } from '../../store/add-to-favorites.actions';
import { addToFavoritesFeature } from '../../store/add-to-favorites.state';
import { ArticleInterface } from '../../../types/article.interface';

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent implements OnInit, OnDestroy {
  @Input('isFavorited') isFavoritedProps!: boolean;
  @Input('articleSlug') articleSlugProps!: string;
  @Input('favoritesCount') favoritesCountProps!: number;
  @Input('isBigButton') isBigButtonProps!: boolean;

  favoritesCount!: number;
  isFavorited!: boolean;
  favoritesSubscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.favoritesSubscription = this.store
      .select(addToFavoritesFeature.selectArticles)
      .subscribe((articles: ArticleInterface[]) => {
        const targetArticle = articles.find(
          (article: ArticleInterface) => article.slug === this.articleSlugProps
        );

        if (targetArticle) {
          this.favoritesCount = targetArticle.favoritesCount;
          this.isFavorited = targetArticle.favorited;
        } else {
          this.favoritesCount = this.favoritesCountProps;
          this.isFavorited = this.isFavoritedProps;
        }
      });
  }

  handleLikes(): void {
    if (this.isFavorited) {
      this.store.dispatch(
        addToFavoritesActions.removeFromFavorites({
          slug: this.articleSlugProps,
        })
      );
    } else {
      this.store.dispatch(
        addToFavoritesActions.addToFavorites({ slug: this.articleSlugProps })
      );
    }
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }
}
