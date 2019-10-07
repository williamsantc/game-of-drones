import { Provider, BindingKey } from '@loopback/core';
import { UserAppMapper } from '../../app/application/mapper/user.app.mapper';

export class UserAppMapperProvider implements Provider<UserAppMapper> {
  constructor(private userAppMapper = new UserAppMapper()) {}
  value(): UserAppMapper {
    return this.userAppMapper;
  }
}

export const USER_APP_MAPPER = BindingKey.create<UserAppMapper>('app.mapper.user');
