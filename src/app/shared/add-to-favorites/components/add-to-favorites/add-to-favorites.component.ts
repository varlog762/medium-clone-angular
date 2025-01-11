import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { addToFavoritesActions } from '../../store/add-to-favorites.actions';
import { addToFavoritesFeature } from '../../store/add-to-favorites.state';
import { ArticleInterface } from '../../../types/article.interface';

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
})
export class AddToFavoritesComponent implements OnInit, OnDestroy {
  @Input('isFavorited') isFavoritedProps!: boolean;
  @Input('articleSlug') articleSlugProps!: string;
  @Input('favoritesCount') favoritesCountProps!: number;
  @Input('isBigButton') isBigButtonProps!: boolean;
  @Input({ alias: 'isLoggedIn' }) isLoggedInProps!: boolean | null;

  favoritesCount!: number;
  isFavorited!: boolean;
  favoritesSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {}

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

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }
}
