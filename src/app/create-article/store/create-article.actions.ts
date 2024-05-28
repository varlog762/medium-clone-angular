import { createActionGroup, props } from '@ngrx/store';

import { ArticleInputInterface } from '../../shared/types/article-input.interface';
import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export const createArticleActions = createActionGroup({
  source: 'Create Article',
  events: {
    'Create article': props<{ articleInput: ArticleInputInterface }>(),
    'Create article success': props<{ article: ArticleInterface }>(),
    'Create article failure': props<{
      errors: BackendErrorsInterface;
    }>(),
  },
});
