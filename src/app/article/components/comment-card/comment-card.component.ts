import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CommentInterface } from '../../types/comment.interface';
import { articleCommentsActions } from '../../store/actions/article-comments.actions';
import { DatePipe } from '@angular/common';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';
import { authFeature } from '../../../auth/store/auth.state';

@Component({
  selector: 'mc-comment-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input('comment') commentProps!: CommentInterface;
  @Input('articleSlug') articleSlugProps!: string;

  store = inject(Store);

  currentUserSubscription!: Subscription;
  isCommentAuthor!: boolean;

  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;

  initializeValues(): void {
    this.currentUserSubscription = this.store
      .select(authFeature.selectCurrentUser)
      .subscribe(user => {
        this.isCommentAuthor =
          user?.username === this.commentProps.author.username;
      });
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  deleteComment(): void {
    this.store.dispatch(
      articleCommentsActions.deleteComment({
        articleSlug: this.articleSlugProps,
        commentId: this.commentProps.id,
      })
    );
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
