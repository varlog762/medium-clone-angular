import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

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
export class ArticleComponent implements OnInit {
  public slug!: string | null;
  public article$!: Observable<ArticleInterface | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.article$ = this.store.select(articleFeature.selectData);
  }

  fetchData(): void {
    if (this.slug) {
      this.store.dispatch(ArticleActions.getArticle({ slug: this.slug }));
    }
  }
}
