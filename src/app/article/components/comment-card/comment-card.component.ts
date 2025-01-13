import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CommentInterface } from '../../types/comment.interface';
import { articleCommentsActions } from '../../store/actions/article-comments.actions';
import { DatePipe } from '@angular/common';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';
import { authFeature } from '../../../auth/store/auth.state';

/**
 * This component is responsible for rendering a single comment in the article page.
 * It displays:
 * - The comment's text.
 * - The author's information (username and avatar).
 * - The publication date of the comment.
 * - A "delete" button if the current user is the author of the comment.
 */
@Component({
  selector: 'mc-comment-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent implements OnInit, OnDestroy {
  /** The comment to be rendered */
  @Input('comment') commentProps!: CommentInterface;

  /** The article slug */
  @Input('articleSlug') articleSlugProps!: string;

  store = inject(Store);

  /** Subscription for tracking the current user */
  currentUserSubscription!: Subscription;

  /** Determines if the current user is the author of the comment */
  isCommentAuthor!: boolean;

  /** Default image to display if the author's avatar is not set */
  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;

  /**
   * Initializes component values, including checking if the current user
   * is the author of the comment.
   */
  initializeValues(): void {
    this.currentUserSubscription = this.store
      .select(authFeature.selectCurrentUser)
      .subscribe(user => {
        this.isCommentAuthor =
          user?.username === this.commentProps.author.username;
      });
  }

  /**
   * Initializes the component:
   * - Sets up input values.
   */
  ngOnInit(): void {
    this.initializeValues();
  }

  /**
   * Deletes the comment. Dispatches the action to delete the comment using the
   * article slug and comment ID as parameters.
   */
  deleteComment(): void {
    this.store.dispatch(
      articleCommentsActions.deleteComment({
        articleSlug: this.articleSlugProps,
        commentId: this.commentProps.id,
      })
    );
  }

  /**
   * Unsubscribes from the current user subscription to prevent memory leaks
   * when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
