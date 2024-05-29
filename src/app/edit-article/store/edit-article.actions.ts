import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';
import { ArticleInputInterface } from '../../shared/types/article-input.interface';

export const editArticleActions = createActionGroup({
  source: 'Edit Article',
  events: {
    'Update article': props<{
      slug: string;
      articleInput: ArticleInputInterface;
    }>(),
    'Update article success': props<{ article: ArticleInterface }>(),
    'Update article failure': props<{ errors: BackendErrorsInterface }>(),
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: ArticleInterface }>(),
    'Get article failure': emptyProps(),
  },
});
