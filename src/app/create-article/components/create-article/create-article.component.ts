import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { ArticleFormComponent } from '../../../shared/article-form/article-form.component';
import { createArticleFeature } from '../../store/create-article.state';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { createArticleActions } from '../../store/create-article.actions';

/**
 * CreateArticleComponent is responsible for rendering the form to create a new article.
 * It interacts with the store to manage the form submission state and validation errors.
 */
@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent implements OnInit {
  /**
   * The initial values for the article form.
   * These values will be used to pre-populate the form when creating a new article.
   */
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  /**
   * Observable that tracks the submission state of the article form.
   */
  isSubmitting$!: Observable<boolean>;

  /**
   * Observable that holds any backend validation errors.
   */
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound
   * properties of a directive. It is called only once when the directive is
   * instantiated.
   *
   * This method is used to initialize the `isSubmitting$` and `backendErrors$`
   * observables by calling the `initializeValues` method.
   *
   * @returns void
   */
  ngOnInit(): void {
    this.initializeValues();
  }

  /**
   * Initializes the `isSubmitting$` and `backendErrors$` observables by selecting
   * the corresponding values from the store.
   *
   * The `isSubmitting$` observable tracks the state of the article form submission.
   * The `backendErrors$` observable holds any backend validation errors that may
   * have occurred as a result of submitting the form.
   *
   * @returns void
   */
  initializeValues(): void {
    this.isSubmitting$ = this.store.select(
      createArticleFeature.selectIsSubmitting
    );
    this.backendErrors$ = this.store.select(
      createArticleFeature.selectValidationErrors
    );
  }

  /**
   * Submits the article form by dispatching the `createArticle` action
   * with the provided `articleInput`.
   *
   * @param articleInput The input data for the article form.
   * @returns void
   */
  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleActions.createArticle({ articleInput }));
  }
}
