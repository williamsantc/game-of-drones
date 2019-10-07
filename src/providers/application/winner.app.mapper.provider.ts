import { BindingKey, Provider } from '@loopback/context';
import { WinnerAppMapper } from '../../app/application/mapper/winner.app.mapper';

export class WinnerAppMapperProvider implements Provider<WinnerAppMapper> {
  constructor(private winnerAppMapper = new WinnerAppMapper()) {}
  value(): WinnerAppMapper {
    return this.winnerAppMapper;
  }
}

export const WINNER_APP_MAPPER = BindingKey.create<WinnerAppMapper>('app.mapper.winner');
