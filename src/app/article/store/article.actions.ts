import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ArticleInterface } from '../../shared/types/article.interface';

export const ArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Get article': props<{ slug: string }>(),
    'Get article success': props<{ article: ArticleInterface }>(),
    'Get article failure': emptyProps(),
  },
});
