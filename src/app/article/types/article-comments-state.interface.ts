import { CommentInterface } from './comment.interface';

export interface ArticleCommentsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: CommentInterface[] | null;
}
