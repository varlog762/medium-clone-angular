import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { ArticleInterface } from '../../shared/types/article.interface';
import { articleFeature } from '../store/article.state';
import { ArticleActions } from '../store/article.actions';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit, OnDestroy {
  public slug!: string | null;
  public article!: ArticleInterface | null;
  public articleSubscription$!: Subscription;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  initializeListeners(): void {
    this.articleSubscription$ = this.store
      .select(articleFeature.selectData)
      .subscribe(
        (article: ArticleInterface | null) => (this.article = article)
      );
  }

  fetchData(): void {
    if (this.slug) {
      this.store.dispatch(ArticleActions.getArticle({ slug: this.slug }));
    }
  }

  ngOnDestroy(): void {
    this.articleSubscription$.unsubscribe();
  }
}
