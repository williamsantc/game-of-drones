import { Provider, BindingKey, inject } from '@loopback/core';
import { UserService } from '../../app/domain/service/user.service';
import { UserRepositoryPort } from '../../app/domain/port/user.repository.port';
import { USER_REPOSITORY } from '../infrastructure/user.repository.provider';

export class UserServiceProvider implements Provider<UserService> {
  private readonly userService: UserService;
  constructor(@inject(USER_REPOSITORY) private userRepositoryPort: UserRepositoryPort) {
    this.userService = new UserService(this.userRepositoryPort);
  }

  value(): UserService {
    return this.userService;
  }
}

export const USER_SERVICE = BindingKey.create<UserService>('domain.service.user');
