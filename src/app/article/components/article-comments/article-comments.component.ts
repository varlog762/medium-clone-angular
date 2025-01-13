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

/**
 * Component for handling article comments.
 *
 * Main features:
 * - Displays a form for adding new comments (only for logged-in users).
 * - Lists all comments for a given article.
 * - Integrates with NgRx state management for loading, submitting, and managing errors.
 */
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
  /** Article slug used to fetch comments and add new ones */
  @Input('articleSlug') articleSlugProps!: string;

  /** Observable for the loading state of comments */
  isLoading$!: Observable<boolean>;

  /** Observable for the state of form submission */
  isSubmitting$!: Observable<boolean>;

  /** Observable for potential errors during operations */
  errors$!: Observable<BackendErrorsInterface | null>;

  /** Observable for the list of comments */
  articleComments$!: Observable<CommentInterface[] | null>;

  /** Observable to determine if the user is logged in */
  isLoggedIn$!: Observable<boolean | null>;

  /** Observable for the current user details */
  currentUser$!: Observable<CurrentUserInterface>;

  /** Reactive form for adding new comment */
  addCommentForm!: FormGroup;

  /** Default image used for users without a profile picture */
  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;

  constructor(private store: Store, private fb: FormBuilder) {}

  /**
   * Initializes the component.
   * - Sets up Observables.
   * - Creates the comment form.
   * - Dispatches the action to fetch existing comments.
   */
  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
    this.fetchData();
  }

  /**
   * Initializes the Observables for component data.
   */
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

  /**
   * Sets up the reactive form for adding a comment.
   */
  initializeForm(): void {
    this.addCommentForm = this.fb.group({
      body: ['', Validators.required],
    });
  }

  /**
   * Getter for the 'body' form control.
   */
  get body() {
    return this.addCommentForm.get('body');
  }

  /**
   * Dispatches an action to fetch comments for the article.
   */
  fetchData(): void {
    this.store.dispatch(
      articleCommentsActions.getComments({ articleSlug: this.articleSlugProps })
    );
  }

  /**
   * Handles the form submission for adding a new comment.
   * - Dispatches the add comment action.
   * - Resets the form after submission.
   */
  onSubmit() {
    const addCommentRequest = {
      articleSlug: this.articleSlugProps,
      commentInput: this.addCommentForm.value,
    };

    this.store.dispatch(articleCommentsActions.addComment(addCommentRequest));
    this.addCommentForm.reset();
  }
}
