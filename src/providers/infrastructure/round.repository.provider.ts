import { BindingKey, inject, Provider } from '@loopback/context';
import { RoundRepositoryPort } from '../../app/domain/port/round.repository.port';
import { ROUND_MAPPER } from './round.mapper.provider';
import { RoundMapper } from '../../app/infrastructure/repository/mapper/round.mapper';
import { repository } from '@loopback/repository';
import { RoundLoopbackRepository } from '../../app/infrastructure/repository/loopback';
import { RoundRepositoryAdapter } from '../../app/infrastructure/repository/round.repository.adapter';

export class RoundRepositoryProvider implements Provider<RoundRepositoryPort> {
  private roundRepository: RoundRepositoryPort;
  constructor(
    @inject(ROUND_MAPPER) private roundMapper: RoundMapper,
    @repository(RoundLoopbackRepository) private roundLbRepo: RoundLoopbackRepository,
  ) {
    this.roundRepository = new RoundRepositoryAdapter(roundLbRepo, roundMapper);
  }
  value(): RoundRepositoryPort {
    return this.roundRepository;
  }
}

export const ROUND_REPOSITORY = BindingKey.create<RoundRepositoryPort>('inf.repository.round');
