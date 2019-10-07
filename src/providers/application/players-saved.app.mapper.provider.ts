import { BindingKey, Provider } from '@loopback/context';
import { PlayersSavedAppMapper } from '../../app/application/mapper/players-saved.app.mapper';

export class PlayersSavedAppMapperProvider implements Provider<PlayersSavedAppMapper> {
  constructor(private playersSavedMapper = new PlayersSavedAppMapper()) {}

  value(): PlayersSavedAppMapper {
    return this.playersSavedMapper;
  }
}

export const PLAYERS_SAVED_APP_MAPPER = BindingKey.create<PlayersSavedAppMapper>('app.mapper.players-saved');
