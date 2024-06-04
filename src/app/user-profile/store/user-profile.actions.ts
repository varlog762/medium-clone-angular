import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ProfileInterface } from '../../shared/types/profile.interface';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get user profile': props<{ slug: string }>(),
    'Get user profile success': props<{ profile: ProfileInterface }>(),
    'Get user profile failure': emptyProps(),
    'Follow user': props<{ slug: string; isFollowed: boolean }>(),
    'Follow user success': props<{ profile: ProfileInterface }>(),
    'Follow user failure': emptyProps(),
  },
});
