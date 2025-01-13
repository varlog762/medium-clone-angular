import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { articleFeature } from '../../store/states/article.state';
import { articleActions } from '../../store/actions/article.actions';
import { authFeature } from '../../../auth/store/auth.state';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/error-message/error-message.component';
import { TagListComponent } from '../../../shared/tag-list/tag-list.component';
import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { ArticleMetaComponent } from '../article-meta/article-meta.component';

/**
 * Component for displaying a single article.
 *
 * Main features:
 * - Displays the article title, body, and tags.
 * - Shows comments through the `mc-article-comments` component.
 * - Allows editing and deleting the article (only for the author).
 * - Displays follow and like buttons for other users.
 * - Integrates with the state management using NgRx.
 */
@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    ArticleCommentsComponent,
    ArticleMetaComponent,
    MarkdownModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit, OnDestroy {
  router = inject(Router);

  /** Article slug retrieved from the URL */
  slug!: string | null;

  /** Current article data */
  article!: ArticleInterface | null;

  /** Subscription for article data updates */
  articleSubscription!: Subscription;

  /** Observable to track the loading state */
  isLoading$!: Observable<boolean>;

  /** Observable to handle errors */
  error$!: Observable<string | null>;

  /** Observable: true if the current user is the article's author */
  isAuthor$!: Observable<boolean>;

  /** Observable: true if the user is logged in */
  isLoggedIn$!: Observable<boolean | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  /**
   * Initializes the component:
   * - Sets up input values.
   * - Subscribes to state changes.
   * - Fetches article data.
   */
  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  /**
   * Sets up Observables and component parameters.
   */
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

  /**
   * Subscribes to article state updates from the store.
   */
  initializeListeners(): void {
    this.articleSubscription = this.store
      .select(articleFeature.selectData)
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  /**
   * Fetches article data from the API using the slug.
   */
  fetchData(): void {
    if (this.slug) {
      this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    }
  }

  /**
   * Deletes the current article (if the slug is available).
   */
  deleteArticle(): void {
    if (this.slug) {
      this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
    }
  }

  /**
   * Redirects to the article editing page (if the slug is available).
   */
  editArticle(): void {
    if (this.slug) {
      this.router.navigate(['articles', this.slug, 'edit']);
    }
  }

  /**
   * Unsubscribes from all subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
