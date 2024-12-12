import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';

import { articleCommentsActions } from '../../store/actions/article-comments.actions';
import { CommentInterface } from '../../types/comment.interface';
import { articleCommentsFeature } from '../../store/states/article-comments.state';
import { BackendErrorMessagesComponent } from '../../../shared/backend-error-messages/components/backend-error-messages.component';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { authFeature } from '../../../auth/store/auth.state';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';

@Component({
  selector: 'mc-article-comments',
  standalone: true,
  imports: [
    AsyncPipe,
    BackendErrorMessagesComponent,
    RouterLink,
    ReactiveFormsModule,
    CommentCardComponent,
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss',
})
export class ArticleCommentsComponent implements OnInit {
  @Input('articleSlug') articleSlugProps!: string;

  isLoading$!: Observable<boolean>;
  isSubmitting$!: Observable<boolean>;
  errors$!: Observable<BackendErrorsInterface | null>;
  articleComments$!: Observable<CommentInterface[] | null>;
  isLoggedIn$!: Observable<boolean | null>;
  currentUser$!: Observable<CurrentUserInterface>;
  addCommentForm!: FormGroup;

  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
    this.fetchData();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(
      select(articleCommentsFeature.selectIsLoading)
    );
    this.isSubmitting$ = this.store.pipe(
      select(articleCommentsFeature.selectIsSubmitting)
    );
    this.errors$ = this.store.pipe(select(articleCommentsFeature.selectErrors));
    this.articleComments$ = this.store.pipe(
      select(articleCommentsFeature.selectData)
    );
    this.isLoggedIn$ = this.store.pipe(select(authFeature.selectIsLoggedIn));
    this.currentUser$ = this.store.pipe(
      select(authFeature.selectCurrentUser),
      filter(Boolean)
    );
  }

  initializeForm(): void {
    this.addCommentForm = this.fb.group({
      body: ['', Validators.required],
    });
  }

  get body() {
    return this.addCommentForm.get('body');
  }

  fetchData(): void {
    this.store.dispatch(
      articleCommentsActions.getComments({ articleSlug: this.articleSlugProps })
    );
  }

  onSubmit() {
    const addCommentRequest = {
      articleSlug: this.articleSlugProps,
      commentInput: this.addCommentForm.value,
    };

    this.store.dispatch(articleCommentsActions.addComment(addCommentRequest));
    this.addCommentForm.reset();
  }
}
