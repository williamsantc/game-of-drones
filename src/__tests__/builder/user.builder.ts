import { UserModel } from '../../app/domain/model/user.model';

export class UserBuilder {
  private userNickname: string;
  private userCreationTime: Date;

  constructor() {
    this.userNickname = 'testuser';
    this.userCreationTime = new Date();
  }

  public withNickname(nickname: string): UserBuilder {
    this.userNickname = nickname;
    return this;
  }

  public withUserCreationTime(userCreationTime: Date): UserBuilder {
    this.userCreationTime = userCreationTime;
    return this;
  }

  public build(): UserModel {
    const userModel = new UserModel(this.userNickname);
    userModel.setUserCreationTime(this.userCreationTime);
    return userModel;
  }
}
