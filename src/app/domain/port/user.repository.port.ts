import { UserModel } from '../model/user.model';

export interface UserRepositoryPort {
  /**
   * Save user if not exist
   *
   * @param user user to be saved
   */
  saveUser(user: UserModel): Promise<void>;
  /**
   * checks if the a user exist by his nickname
   *
   * @param nickname nickname of the user
   * @returns boolean as a promise
   *
   **/
  checkIfExistByNickName(nickname: string): Promise<boolean>;
}
