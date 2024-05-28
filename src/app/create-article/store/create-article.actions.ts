import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ArticleInputInterface } from '../../shared/types/article-input.interface';
import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorMessagesComponent } from '../../shared/backend-error-messages/components/backend-error-messages.component';

export const createArticleActions = createActionGroup({
  source: 'Create Article',
  events: {
    'Create article': props<{ articleInput: ArticleInputInterface }>(),
    'Create article success': props<{ article: ArticleInterface }>(),
    'Create article failure': props<{
      errors: BackendErrorMessagesComponent;
    }>(),
  },
});
