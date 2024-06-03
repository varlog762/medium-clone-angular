import { ProfileInterface } from '../../shared/types/profile.interface';

export interface UserProfileStateInterface {
  isLoading: boolean;
  profile: ProfileInterface | null;
  errors: string | null;
}
