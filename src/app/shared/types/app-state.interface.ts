import { AuthStateInterface } from '../../auth/types/auth-state.interface';
import { FeedStateInterface } from '../feed/types/feed-state.interface';
import { PopularTagsStateInterface } from '../popular-tags/types/popular-tags-state.interface';

export interface AppSateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
}
