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

@Component({
  selector: 'mc-edit-article',
  standalone: true,
  imports: [AsyncPipe, ArticleFormComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit, OnDestroy {
  public slug!: string | null;
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrorsInterface | null>;
  public initialValues!: ArticleInputInterface;
  public initialValuesSubscription$!: Subscription;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.select(
      editArticleFeature.selectIsSubmitting
    );
    this.backendErrors$ = this.store.select(
      editArticleFeature.selectValidationErrors
    );
  }

  ngOnDestroy(): void {}
}
