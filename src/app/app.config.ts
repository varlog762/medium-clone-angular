import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';
import { authFeature } from './auth/store/auth.state';
import { urlInterceptor } from './shared/interceptors/url.interceptor';
import { RegisterEffects } from './auth/store/effects/register.effects';
import { LoginEffects } from './auth/store/effects/login.effects';
import { GetCurrentUserEffects } from './auth/store/effects/get-current-user.effects';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { GetFeedEffects } from './shared/feed/store/get-feed.effects';
import { feedFeature } from './shared/feed/store/feed.state';
import { popularTagsFeature } from './shared/popular-tags/store/popular-tags.state';
import { GetPopularTagsEffects } from './shared/popular-tags/store/get-popular-tags.effects';
import { GetArticleEffects } from './article/store/effects/get-article.effects';
import { GetArticleEffects as GetArticleForEditEffects } from './edit-article/store/effects/get-article.effects';
import { articleFeature } from './article/store/states/article.state';
import { DeleteArticleEffects } from './article/store/effects/delete-article.effects';
import { CreateArticleEffects } from './create-article/store/create-article.effects';
import { createArticleFeature } from './create-article/store/create-article.state';
import { EditArticleEffects } from './edit-article/store/effects/edit-article.effects';
import { editArticleFeature } from './edit-article/store/edit-article.state';
import { UpdateCurrentUserEffects } from './auth/store/effects/update-current-user.effects';
import { userSettingsFeature } from './user-settings/store/user-setting.state';
import { LogoutEffects } from './auth/store/effects/logout.effects';
import { AddToFavoriteEffects } from './shared/add-to-favorites/store/add-to-favorites.effects';
import { userProfileFeature } from './user-profile/store/user-profile.state';
import { GetUserProfileEffects } from './user-profile/store/get-user-profile.effects';
import { AddToFollowEffects } from './shared/add-to-follow/store/add-to-follow.effects';
import { GetArticleCommentsEffects } from './article/store/effects/get-article-comments.effects';
import { articleCommentsFeature } from './article/store/states/article-comments.state';
import { AddArticleCommentEffects } from './article/store/effects/add-article-comment.effects';
import { DeleteArticleCommentEffects } from './article/store/effects/delete-article-comment.effects';
import { addToFavoritesFeature } from './shared/add-to-favorites/store/add-to-favorites.state';
import { addToFollowFeature } from './shared/add-to-follow/store/add-to-follow.state';

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
    provideState(userSettingsFeature),
    provideState(userProfileFeature),
    provideState(articleCommentsFeature),
    provideState(addToFavoritesFeature),
    provideState(addToFollowFeature),
    provideEffects(
      RegisterEffects,
      LoginEffects,
      GetCurrentUserEffects,
      GetFeedEffects,
      GetPopularTagsEffects,
      GetArticleEffects,
      DeleteArticleEffects,
      CreateArticleEffects,
      EditArticleEffects,
      GetArticleForEditEffects,
      UpdateCurrentUserEffects,
      LogoutEffects,
      AddToFavoriteEffects,
      GetUserProfileEffects,
      AddToFollowEffects,
      GetArticleCommentsEffects,
      AddArticleCommentEffects,
      DeleteArticleCommentEffects
    ),
    provideMarkdown(),
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
