import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CommentInterface } from '../../types/comment.interface';
import { articleCommentsActions } from '../../store/actions/article-comments.actions';
import { DatePipe } from '@angular/common';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';

@Component({
  selector: 'mc-comment-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent {
  @Input('comment') commentProps!: CommentInterface;
  @Input('articleSlug') articleSlugProps!: string;

  store = inject(Store);

  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;

  deleteComment(): void {
    this.store.dispatch(
      articleCommentsActions.deleteComment({
        articleSlug: this.articleSlugProps,
        commentId: this.commentProps.id,
      })
    );
  }
}
