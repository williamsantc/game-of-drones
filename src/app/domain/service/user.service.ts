import { UserRepositoryPort } from '../port/user.repository.port';
import { UserModel } from '../model/user.model';
import { PlayersSavedModel } from '../model/players-saved.model';

export class UserService {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  public async saveUsers(userOne: UserModel, userTwo: UserModel): Promise<PlayersSavedModel> {
    let pOneExist = true;
    let pTwoExist = true;
    if (!(await this.userRepositoryPort.checkIfExistByNickName(userOne.getUserNickname()))) {
      await this.userRepositoryPort.saveUser(userOne);
      pOneExist = false;
    }

    if (!(await this.userRepositoryPort.checkIfExistByNickName(userTwo.getUserNickname()))) {
      await this.userRepositoryPort.saveUser(userTwo);
      pTwoExist = false;
    }
    return new PlayersSavedModel(pOneExist, pTwoExist);
  }
}
