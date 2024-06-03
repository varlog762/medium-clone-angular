import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ProfileInterface } from '../../shared/types/profile.interface';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get profile': props<{ slug: string }>(),
    'Get profile success': props<{ profile: ProfileInterface }>(),
    'Get profile failure': emptyProps(),
  },
});
