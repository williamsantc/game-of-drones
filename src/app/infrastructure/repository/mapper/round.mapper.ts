import { RoundEntity } from '../entity/round.entity';
import { RoundModel } from '../../../domain/model/round.model';

export class RoundMapper {
  public entityToDomain(round: RoundEntity): RoundModel {
    const roundModel = new RoundModel(round.gameId, round.movementUserOne, round.movementUserTwo);
    roundModel.setWinner(round.winner);
    return roundModel;
  }

  public entityToDomainList(roundList: RoundEntity[]): RoundModel[] {
    return roundList.map(this.entityToDomain);
  }

  public domainToEntity(roundModel: RoundModel): RoundEntity {
    const roundEntity = new RoundEntity();
    roundEntity.gameId = roundModel.getGameId();
    roundEntity.movementUserOne = roundModel.getMovementUserOne();
    roundEntity.movementUserTwo = roundModel.getMovementUserTwo();
    roundEntity.winner = roundModel.getWinner();
    return roundEntity;
  }
}
