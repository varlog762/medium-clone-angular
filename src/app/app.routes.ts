import { Routes } from '@angular/router';

import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { GlobalFeedComponent } from './global-feed/components/global-feed/global-feed.component';
import { YourFeedComponent } from './your-feed/components/your-feed.component';
import { TagFeedComponent } from './tag-feed/components/tag-feed.component';
import { ArticleComponent } from './article/components/article.component';
import { CreateArticleComponent } from './create-article/components/create-article/create-article.component';

export const routes: Routes = [
  { path: '', component: GlobalFeedComponent },
  { path: 'feed', component: YourFeedComponent },
  { path: 'tags/:slug', component: TagFeedComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'articles/new', component: CreateArticleComponent },
  { path: 'articles/:slug', component: ArticleComponent },
];
