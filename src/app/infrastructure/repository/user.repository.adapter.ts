import { UserRepositoryPort } from '../../domain/port/user.repository.port';
import { UserModel } from '../../domain/model/user.model';
import { UserLoopbackRepository } from './loopback/user-loopback.repository';
import { UserMapper } from './mapper/user.mapper';

export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private userLpRepo: UserLoopbackRepository, private userMapper: UserMapper) {}

  async saveUser(user: UserModel): Promise<void> {
    await this.userLpRepo.create(this.userMapper.domainToEntity(user));
  }

  checkIfExistByNickName(nickname: string) {
    return this.userLpRepo.exists(nickname);
  }
}
