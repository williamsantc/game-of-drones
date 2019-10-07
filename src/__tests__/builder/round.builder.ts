import { AvailableMovementsEnum } from '../../app/domain/model/available-movements.enum';
import { RoundModel } from '../../app/domain/model/round.model';
import { RoundWinnerEnum } from '../../app/domain/model/round-winner.enum';

export class RoundBuilder {
  private gameId: number;
  private movementUserOne: AvailableMovementsEnum;
  private movementUserTwo: AvailableMovementsEnum;
  private winner: number;

  constructor() {
    this.gameId = 1;
    this.movementUserOne = AvailableMovementsEnum.ROCK;
    this.movementUserTwo = AvailableMovementsEnum.PAPER;
    this.winner = RoundWinnerEnum.USER_TWO;
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

  public withWinner(winner: number) {
    this.winner = winner;
    return this;
  }

  public build() {
    const roundModel = new RoundModel(this.gameId, this.movementUserOne, this.movementUserTwo);
    roundModel.setWinner(this.winner);
    return roundModel;
  }
}
