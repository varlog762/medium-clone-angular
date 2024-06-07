import { GetArticleResponseInterface } from '../../shared/types/get-article-response.interface';

export interface ArticleCommentsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetArticleResponseInterface | null;
}
