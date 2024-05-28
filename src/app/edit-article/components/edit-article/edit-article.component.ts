import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

import { ArticleFormComponent } from '../../../shared/article-form/article-form.component';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mc-edit-article',
  standalone: true,
  imports: [AsyncPipe, ArticleFormComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent {
  public isSubmitting$!: Observable<boolean>;
  public backendErrors$!: Observable<BackendErrorsInterface | null>;
  public initialValues!: ArticleInputInterface;
  public initialValuesSubscription$!: Subscription;
  public slug!: string;

  constructor(private store: Store, private route: ActivatedRoute) {}
}
