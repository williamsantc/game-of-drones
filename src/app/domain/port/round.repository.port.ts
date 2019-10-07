import { RoundModel } from '../model/round.model';

export interface RoundRepositoryPort {
  findMovementsByGameId(gameId: number): Promise<RoundModel[]>;

  saveRoundMovements(roundModel: RoundModel): Promise<void>;
}
