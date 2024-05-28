import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface EditArticleStateInterface {
  isSubmitting: boolean;
  data: ArticleInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
