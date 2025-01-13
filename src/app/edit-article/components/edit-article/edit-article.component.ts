import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

import { ArticleFormComponent } from '../../../shared/article-form/article-form.component';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { ActivatedRoute } from '@angular/router';
import { editArticleFeature } from '../../store/edit-article.state';
import { editArticleActions } from '../../store/edit-article.actions';
import { LoadingComponent } from '../../../shared/loading/loading.component';

/**
 * EditArticleComponent is responsible for displaying the form to edit an existing article.
 * It fetches the article data from the store based on the slug, and allows users to submit updated article data.
 */
@Component({
  selector: 'mc-edit-article',
  standalone: true,
  imports: [AsyncPipe, ArticleFormComponent, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit, OnDestroy {
  /** The slug of the article to be edited */
  public slug!: string | null;

  /** Indicates whether the form is currently submitting */
  public isSubmitting$!: Observable<boolean>;

  /** Indicates whether the form is currently loading */
  public isLoading$!: Observable<boolean>;

  /** The backend validation errors */
  public backendErrors$!: Observable<BackendErrorsInterface | null>;

  /** The initial values for the form */
  public initialValues!: ArticleInputInterface;

  /** The subscription to the initialValues observable */
  public initialValuesSubscription!: Subscription;

  constructor(private store: Store, private route: ActivatedRoute) {}

  /**
   * Lifecycle hook for component initialization.
   * Initializes values and fetches the article data based on the slug from the route.
   */
  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  /**
   * Dispatches an action to fetch the article data based on the slug from the route.
   * The action is only dispatched if the slug is available.
   */
  fetchData(): void {
    if (this.slug) {
      this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
    }
  }

  /**
   * Initializes the Observables for component data, and the initial values for the form.
   * The `isSubmitting$` observable tracks the state of the article form submission.
   * The `isLoading$` observable tracks the state of the article loading.
   * The `backendErrors$` observable holds any backend validation errors that may have occurred.
   * The `initialValues` property is used to initialize the form with the existing article data.
   * @returns void
   */
  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.select(
      editArticleFeature.selectIsSubmitting
    );
    this.isLoading$ = this.store.select(editArticleFeature.selectIsloading);
    this.backendErrors$ = this.store.select(
      editArticleFeature.selectValidationErrors
    );
    this.initialValuesSubscription = this.store
      .select(editArticleFeature.selectData)
      .subscribe(article => {
        this.initialValues = {
          title: article?.title ?? '',
          description: article?.description ?? '',
          body: article?.body ?? '',
          tagList: article?.tagList ?? [],
        };
      });
  }

  /**
   * Dispatches an action to update the article based on the slug from the route.
   * The action is only dispatched if the slug is available.
   * @param articleInput The input data for the article form.
   * @returns void
   */
  onSubmit(articleInput: ArticleInputInterface) {
    if (this.slug) {
      this.store.dispatch(
        editArticleActions.updateArticle({
          slug: this.slug,
          articleInput,
        })
      );
    }
  }

  /**
   * Lifecycle hook for component destruction.
   * Unsubscribes from the `initialValues` subscription to prevent memory leaks.
   * @returns void
   */
  ngOnDestroy(): void {
    this.initialValuesSubscription.unsubscribe();
  }
}
