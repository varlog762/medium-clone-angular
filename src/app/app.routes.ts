import { Routes } from '@angular/router';

import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { GlobalFeedComponent } from './global-feed/components/global-feed/global-feed.component';
import { YourFeedComponent } from './your-feed/components/your-feed.component';

export const routes: Routes = [
  { path: '', component: GlobalFeedComponent },
  { path: 'feed', component: YourFeedComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
