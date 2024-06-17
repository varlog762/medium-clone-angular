import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ArticleInterface } from '../../types/article.interface';

export const addToFavoritesActions = createActionGroup({
  source: 'Add To Favorites',
  events: {
    'Add to favorites': props<{ slug: string; isFavorited: boolean }>(),
    'Add to favorites success': props<{ article: ArticleInterface }>(),
    'Add to favorites failure': emptyProps(),
  },
});
