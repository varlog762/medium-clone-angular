import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, map } from 'rxjs';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { articleFeature } from '../../store/states/article.state';
import { articleActions } from '../../store/actions/article.actions';
import { authFeature } from '../../../auth/store/auth.state';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/error-message/error-message.component';
import { TagListComponent } from '../../../shared/tag-list/tag-list.component';
import { AddToFollowComponent } from '../../../shared/add-to-follow/components/add-to-follow/add-to-follow.component';
import { AddToFavoritesComponent } from '../../../shared/add-to-favorites/components/add-to-favorites/add-to-favorites.component';
import { ArticleCommentsComponent } from '../article-comments/article-comments.component';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    AddToFollowComponent,
    AddToFavoritesComponent,
    ArticleCommentsComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug!: string | null;
  article!: ArticleInterface | null;
  articleSubscription!: Subscription;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;
  isLoggedIn$!: Observable<boolean | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.select(articleFeature.selectIsLoading);
    this.error$ = this.store.select(articleFeature.selectError);
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
    this.isAuthor$ = combineLatest([
      this.store.select(articleFeature.selectData),
      this.store.select(authFeature.selectCurrentUser),
    ]).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (article && currentUser) {
            return article.author.username === currentUser.username;
          }

          return false;
        }
      )
    );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .select(articleFeature.selectData)
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    if (this.slug) {
      this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    }
  }

  deleteArticle(): void {
    if (this.slug) {
      this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
    }
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
