import { AuthStateInterface } from '../../auth/types/auth-state.interface';
import { FeedStateInterface } from '../../global-feed/types/feed-state.interface';

export interface AppSateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
}
