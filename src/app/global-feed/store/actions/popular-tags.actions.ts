import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { PopularTagType } from '../../../shared/types/popular-tag.type';

export const PopularTagsActions = createActionGroup({
  source: 'Popular tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tags success': props<{ tags: PopularTagType[] }>(),
    'Get popular tags failure': emptyProps(),
  },
});
