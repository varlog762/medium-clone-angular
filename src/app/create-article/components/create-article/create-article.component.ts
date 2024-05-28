import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { ArticleFormComponent } from '../../../shared/article-form/article-form.component';
import { createArticleFeature } from '../../store/create-article.state';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { createArticleActions } from '../../store/create-article.actions';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent implements OnInit {
  public initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.select(
      createArticleFeature.selectIsSubmitting
    );
    this.backendErrors$ = this.store.select(
      createArticleFeature.selectValidationErrors
    );
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleActions.createArticle({ articleInput }));
  }
}
