import { RequiredValueError } from '../error/required-value.error';

export class UserModel {
  public static readonly NICKNAME_REQUIRED = 'The nickname of the user is required';

  private readonly userNickname: string;
  private userCreationTime: Date;

  constructor(userNickname: string) {
    if (!userNickname) {
      throw new RequiredValueError(UserModel.NICKNAME_REQUIRED);
    }
    this.userNickname = userNickname;
    this.userCreationTime = new Date();
  }

  public setUserCreationTime(userCreationTime: Date): void {
    this.userCreationTime = userCreationTime;
  }

  public getUserNickname(): string {
    return this.userNickname;
  }

  public getUserCreationTime(): Date {
    return this.userCreationTime;
  }
}
