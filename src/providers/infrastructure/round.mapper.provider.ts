import { BindingKey, Provider } from '@loopback/context';
import { RoundMapper } from '../../app/infrastructure/repository/mapper/round.mapper';

export class RoundMapperProvider implements Provider<RoundMapper> {
  constructor(private roundMapper = new RoundMapper()) {}

  value(): RoundMapper {
    return this.roundMapper;
  }
}

export const ROUND_MAPPER = BindingKey.create<RoundMapper>('inf.mapper.round');
