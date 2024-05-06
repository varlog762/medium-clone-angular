import { PopularTagType } from '../../shared/types/popular-tag.type';

export interface PopularTagsStateInterface {
  tags: PopularTagType[] | null;
  error: string | null;
}
