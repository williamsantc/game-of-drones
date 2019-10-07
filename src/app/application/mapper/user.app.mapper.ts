import { UserType } from '../type/user.type';
import { UserModel } from '../../domain/model/user.model';
import { RequiredValueError } from '../../domain/error/required-value.error';

export class UserAppMapper {
  private static readonly BOTH_PLAYERS_REQUIRED = 'Both players are required';

  typeToDomain(userType: UserType): UserModel {
    if (!userType) {
      throw new RequiredValueError(UserAppMapper.BOTH_PLAYERS_REQUIRED);
    }
    return new UserModel(userType.userNickname);
  }

  domainToType(user: UserModel): UserType {
    return { userNickname: user.getUserNickname() };
  }
}
