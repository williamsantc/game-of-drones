import { AvailableMovements, AvailableMovementsEnum } from './available-movements.enum';
import { RequiredValueError } from '../error/required-value.error';

export class RoundModel {
  public static readonly GAME_ID_REQUIRED = 'The game id is required';

  private readonly gameId: number;
  private readonly movementUserOne: AvailableMovementsEnum;
  private readonly movementUserTwo: AvailableMovementsEnum;
  private winner: number;

  constructor(gameId: number, movementUserOne: string, movementUserTwo: string) {
    if (!gameId) {
      throw new RequiredValueError(RoundModel.GAME_ID_REQUIRED);
    }
    this.gameId = gameId;
    this.movementUserOne = AvailableMovements.fromValue(movementUserOne);
    this.movementUserTwo = AvailableMovements.fromValue(movementUserTwo);
  }

  public setWinner(winner: number) {
    this.winner = winner;
  }

  public getGameId() {
    return this.gameId;
  }

  public getMovementUserOne() {
    return this.movementUserOne;
  }

  public getMovementUserTwo() {
    return this.movementUserTwo;
  }

  public getWinner() {
    return this.winner;
  }
}
