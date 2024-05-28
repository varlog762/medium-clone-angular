import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { GetFeedResponseInterface } from '../types/get-feed-response.interface';

export const feedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Get feed': props<{ url: string }>(),
    'Get feed success': props<{ feed: GetFeedResponseInterface }>(),
    'Get feed failure': emptyProps(),
  },
});
