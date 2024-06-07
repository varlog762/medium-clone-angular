import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';
import { CommentInterface } from './comment.interface';

export interface ArticleCommentsStateInterface {
  isLoading: boolean;
  isSubmitting: boolean;
  errors: BackendErrorsInterface | null;
  data: CommentInterface[] | null;
}
