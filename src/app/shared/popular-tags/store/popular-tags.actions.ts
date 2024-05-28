import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { PopularTagType } from '../../types/popular-tag.type';

export const popularTagsActions = createActionGroup({
  source: 'Popular tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tags success': props<{ tags: PopularTagType[] }>(),
    'Get popular tags failure': emptyProps(),
  },
});
