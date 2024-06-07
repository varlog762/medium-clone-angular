import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { CommentInterface } from '../../types/comment.interface';
import { CommentInputInterface } from '../../types/comment-input.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';

export const articleCommentsActions = createActionGroup({
  source: 'Article Comments',
  events: {
    'Get comments': props<{ articleSlug: string }>(),
    'Get comments success': props<{ comments: CommentInterface[] }>(),
    'Get comments failure': emptyProps(),
    'Add comment': props<{
      articleSlug: string;
      commentInput: CommentInputInterface;
    }>(),
    'Add comment success': props<{ comment: CommentInterface }>(),
    'Add comment failure': props<{ errors: BackendErrorsInterface }>(),
    'Delete comment': props<{ articleSlug: string; commentId: number }>(),
    'Delete comment success': props<{ commentId: number }>(),
    'Delete comment failure': emptyProps(),
  },
});
