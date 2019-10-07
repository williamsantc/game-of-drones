import { Provider, BindingKey, inject } from '@loopback/core';
import { UserRepositoryAdapter } from '../../app/infrastructure/repository/user.repository.adapter';
import { UserRepositoryPort } from '../../app/domain/port/user.repository.port';
import { repository } from '@loopback/repository';
import { UserLoopbackRepository } from '../../app/infrastructure/repository/loopback/user-loopback.repository';
import { USER_MAPPER } from './user.mapper.provider';
import { UserMapper } from '../../app/infrastructure/repository/mapper/user.mapper';

export class UserRepositoryProvider implements Provider<UserRepositoryPort> {
  private readonly userRepository: UserRepositoryAdapter;
  constructor(
    @repository(UserLoopbackRepository) private userLpRepo: UserLoopbackRepository,
    @inject(USER_MAPPER) private userMapper: UserMapper,
  ) {
    this.userRepository = new UserRepositoryAdapter(this.userLpRepo, this.userMapper);
  }
  value(): UserRepositoryPort {
    return this.userRepository;
  }
}

export const USER_REPOSITORY = BindingKey.create<UserRepositoryPort>('inf.repository.user');
