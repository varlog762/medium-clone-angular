import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface EditArticleStateInterface {
  isloading: boolean;
  isSubmitting: boolean;
  data: ArticleInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
