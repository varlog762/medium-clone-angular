import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { ArticleInterface } from '../../shared/types/article.interface';
import { articleFeature } from '../store/article.state';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  public article$!: Observable<ArticleInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.article$ = this.store.select(articleFeature.selectData);
  }
}
