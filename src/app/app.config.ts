import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authFeature } from './auth/store/auth.feature';
import { urlInterceptor } from './shared/incterceptors/url.interceptor';
import { provideEffects } from '@ngrx/effects';
import { RegisterEffects } from './auth/store/effects/register.effects';
import { LoginEffects } from './auth/store/effects/login.effects';
import { GetCurrentUserEffects } from './auth/store/effects/get-current-user.effects';
import { authInterceptor } from './shared/incterceptors/auth.interceptor';
import { GetFeedEffects } from './global-feed/store/effects/get-feed.effects';
import { feedFeature } from './global-feed/store/features/feed.feature';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { popularTagsFeature } from './global-feed/store/features/popular-tags.feature';
import { GetPopularTagsEffects } from './global-feed/store/effects/get-popular-tags.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([urlInterceptor, authInterceptor])),
    provideStore({
      router: routerReducer,
    }),
    provideState(authFeature),
    provideState(feedFeature),
    provideState(popularTagsFeature),
    provideEffects(
      RegisterEffects,
      LoginEffects,
      GetCurrentUserEffects,
      GetFeedEffects,
      GetPopularTagsEffects
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideRouterStore(),
  ],
};
