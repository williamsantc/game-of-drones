import { BindingKey, Provider } from '@loopback/context';
import { RoundAppMapper } from '../../app/application/mapper/round.app.mapper';

export class RoundAppMapperProvider implements Provider<RoundAppMapper> {
  constructor(private roundAppMapper = new RoundAppMapper()) {}
  value(): RoundAppMapper {
    return this.roundAppMapper;
  }
}

export const ROUND_APP_MAPPER = BindingKey.create<RoundAppMapper>('app.mapper.round');
