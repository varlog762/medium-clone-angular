import { PopularTagType } from '../../types/popular-tag.type';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  tags: PopularTagType[] | null;
  error: string | null;
}
