import { RoundType } from '../type/round.type';
import { RoundModel } from '../../domain/model/round.model';

export class RoundAppMapper {
  typeToDomain(roundType: RoundType): RoundModel {
    return new RoundModel(roundType.gameId, roundType.movementUserOne, roundType.movementUserTwo);
  }
}
