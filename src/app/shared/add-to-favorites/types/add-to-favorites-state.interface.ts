import { ArticleInterface } from '../../types/article.interface';

export interface AddToFavoritesStateInterface {
  isLoading: boolean;
  articles: ArticleInterface[];
  error: string | null;
}
