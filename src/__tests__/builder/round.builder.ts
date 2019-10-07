import { AvailableMovementsEnum } from '../../app/domain/model/available-movements.enum';
import { RoundModel } from '../../app/domain/model/round.model';

export class RoundBuilder {
  private gameId: number;
  private movementUserOne: AvailableMovementsEnum;
  private movementUserTwo: AvailableMovementsEnum;

  constructor() {
    this.gameId = 1;
    this.movementUserOne = AvailableMovementsEnum.ROCK;
    this.movementUserTwo = AvailableMovementsEnum.PAPER;
  }

  public withGameId(id: number) {
    this.gameId = id;
    return this;
  }

  public withMovementUserOne(movement: AvailableMovementsEnum) {
    this.movementUserOne = movement;
    return this;
  }

  public withMovementUserTwo(movement: AvailableMovementsEnum) {
    this.movementUserTwo = movement;
    return this;
  }

  public build() {
    return new RoundModel(this.gameId, this.movementUserOne, this.movementUserTwo);
  }
}
