import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { addToFavoritesActions } from '../../store/add-to-favorites.actions';
import { addToFavoritesFeature } from '../../store/add-to-favorites.state';
import { ArticleInterface } from '../../../types/article.interface';

/**
 * Component allows users to add or remove articles from their favorites.
 * Displays a compact version of the button in the feed and a detailed version
 * with a label on the article details page.
 */
@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent implements OnInit, OnDestroy {
  /**
   * Indicates whether the article is currently favorited.
   */
  @Input('isFavorited') isFavoritedProps!: boolean;

  /**
   * The unique slug of the article.
   */
  @Input('articleSlug') articleSlugProps!: string;

  /**
   * The initial count of favorites for the article.
   */
  @Input('favoritesCount') favoritesCountProps!: number;

  /**
   * Determines if the button should display a larger version with text labels.
   */
  @Input('isBigButton') isBigButtonProps!: boolean;

  /**
   * Indicates if the current user is logged in.
   */
  @Input({ alias: 'isLoggedIn' }) isLoggedInProps!: boolean | null;

  store = inject(Store);
  router = inject(Router);

  /**
   * Current count of favorites for the article.
   */
  favoritesCount!: number;

  /**
   * Indicates if the article is currently favorited (updated dynamically).
   */
  isFavorited!: boolean;

  /**
   * Subscription for listening to changes in the favorites state.
   */
  favoritesSubscription!: Subscription;

  /**
   * Lifecycle hook that initializes the component's state and listeners.
   */
  ngOnInit(): void {
    this.initializeListeners();
  }

  /**
   * Subscribes to the store and updates the component state based on the
   * latest changes in the favorites list.
   */
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

  /**
   * Handles the click event on the like button.
   * If the user is logged in, it toggles the favorite state of the article.
   * If the user is not logged in, it redirects to the login page.
   */
  handleLikes(): void {
    if (this.isLoggedInProps) {
      this.store.dispatch(
        addToFavoritesActions.addToFavorites({
          slug: this.articleSlugProps,
          isFavorited: this.isFavorited,
        })
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  /**
   * Lifecycle hook that unsubscribes from the favorites state on component destruction.
   */
  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }
}
