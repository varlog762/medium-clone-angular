import { createActionGroup, props } from '@ngrx/store';

import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export const editArticleActions = createActionGroup({
  source: 'Edit Article',
  events: {
    'Edit article': props<{ slug: string }>(),
    'Edit article success': props<{ article: ArticleInterface }>(),
    'Edit article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
