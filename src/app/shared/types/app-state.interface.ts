import { AuthStateInterface } from '../../auth/types/auth-state.interface';
import { FeedStateInterface } from '../../global-feed/types/feed-state.interface';
import { PopularTagsStateInterface } from '../../global-feed/types/popular-tags-state.interface';

export interface AppSateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
}
