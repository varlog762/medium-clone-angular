import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authFeature } from './auth/store/auth.state';
import { urlInterceptor } from './shared/incterceptors/url.interceptor';
import { RegisterEffects } from './auth/store/effects/register.effects';
import { LoginEffects } from './auth/store/effects/login.effects';
import { GetCurrentUserEffects } from './auth/store/effects/get-current-user.effects';
import { authInterceptor } from './shared/incterceptors/auth.interceptor';
import { GetFeedEffects } from './shared/feed/store/get-feed.effects';
import { feedFeature } from './shared/feed/store/feed.state';
import { popularTagsFeature } from './shared/popular-tags/store/popular-tags.state';
import { GetPopularTagsEffects } from './shared/popular-tags/store/get-popular-tags.effects';
import { GetArticleEffects } from './article/store/effects/get-article.effects';
import { articleFeature } from './article/store/article.state';
import { DeleteArticleEffects } from './article/store/effects/delete-article.effects';
import { CreateArticleEffects } from './create-article/store/create-article.effects';
import { createArticleFeature } from './create-article/store/create-article.state';
import { EditArticleEffects } from './edit-article/store/edit-article.effects';
import { editArticleFeature } from './edit-article/store/edit-article.state';

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
    provideState(articleFeature),
    provideState(createArticleFeature),
    provideState(editArticleFeature),
    provideEffects(
      RegisterEffects,
      LoginEffects,
      GetCurrentUserEffects,
      GetFeedEffects,
      GetPopularTagsEffects,
      GetArticleEffects,
      DeleteArticleEffects,
      CreateArticleEffects,
      EditArticleEffects
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
