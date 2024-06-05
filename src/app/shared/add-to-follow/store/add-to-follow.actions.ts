import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ProfileInterface } from '../../types/profile.interface';

export const addToFollowActions = createActionGroup({
  source: 'Add To Follow',
  events: {
    'Follow user': props<{ slug: string; isFollowed: boolean }>(),
    'Follow user success': props<{ profile: ProfileInterface }>(),
    'Follow user failure': emptyProps(),
  },
});
