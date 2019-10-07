import { Provider, BindingKey } from '@loopback/core';
import { UserMapper } from '../../app/infrastructure/repository/mapper/user.mapper';

export class UserMapperProvider implements Provider<UserMapper> {
  constructor(private userMapper = new UserMapper()) {}
  value(): UserMapper {
    return this.userMapper;
  }
}

export const USER_MAPPER = BindingKey.create<UserMapper>('inf.mapper.user');
