import { UserEntity } from '../entity/user.entity';
import { UserModel } from '../../../domain/model/user.model';

export class UserMapper {
  public entityToDomain(userEntity: UserEntity): UserModel {
    const user = new UserModel(userEntity.userNickname);
    user.setUserCreationTime(userEntity.userCreationTime);
    return user;
  }

  public domainToEntity(user: UserModel): UserEntity {
    const userEntity = new UserEntity();
    userEntity.userNickname = user.getUserNickname();
    return userEntity;
  }
}
