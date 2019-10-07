import { RoundLoopbackRepository } from './loopback';
import { RoundModel } from '../../domain/model/round.model';
import { RoundMapper } from './mapper/round.mapper';
import { RoundRepositoryPort } from '../../domain/port/round.repository.port';

export class RoundRepositoryAdapter implements RoundRepositoryPort {
  constructor(private roundLbRepo: RoundLoopbackRepository, private roundMapper: RoundMapper) {}

  async findMovementsByGameId(gameId: number): Promise<RoundModel[]> {
    return this.roundMapper.entityToDomainList(
      await this.roundLbRepo.find({
        where: {
          gameId: gameId,
        },
      }),
    );
  }

  async saveRoundMovements(roundModel: RoundModel): Promise<void> {
    await this.roundLbRepo.save(this.roundMapper.domainToEntity(roundModel));
  }
}
