import { CurrentUserInterface } from './current-user.interface';

export default interface CurrentUserInputInterface
  extends CurrentUserInterface {
  password: string;
}
