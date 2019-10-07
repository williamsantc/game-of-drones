import { GameRepositoryPort } from '../port/game.repository.port';
import { UserRepositoryPort } from '../port/user.repository.port';
import { DataNotFoundError } from '../error/data-not-found.error';
import { RoundRepositoryPort } from '../port/round.repository.port';
import { RoundModel } from '../model/round.model';
import { AvailableMovementsEnum } from '../model/available-movements.enum';
import { UnexpectedGameError } from '../error/unexpected-game.error';

export class GameService {
  public static readonly USER_ONE_NOT_FOUND = 'the user nickname one is not found';
  public static readonly USER_TWO_NOT_FOUND = 'the user nickname two is not found';
  public static readonly GAME_NOT_FOUND = 'the requested game is not found';
  public static readonly NO_ROUND_WINNER_FOUND = (movementOne: string, movementTwo: string) =>
    `The movements ${movementOne} and ${movementTwo} doesn't have a winning strategy`;

  constructor(
    private gameRepositoryPort: GameRepositoryPort,
    private userRepositoryPort: UserRepositoryPort,
    private roundRepositoryPort: RoundRepositoryPort,
  ) {}

  public async createGame(userNicknameOne: string, userNicknameTwo: string): Promise<number> {
    if (!(await this.userRepositoryPort.checkIfExistByNickName(userNicknameOne))) {
      throw new DataNotFoundError(GameService.USER_ONE_NOT_FOUND);
    }

    if (!(await this.userRepositoryPort.checkIfExistByNickName(userNicknameTwo))) {
      throw new DataNotFoundError(GameService.USER_TWO_NOT_FOUND);
    }
    return this.gameRepositoryPort.createGame(userNicknameOne, userNicknameTwo);
  }

  public async playRound(roundModel: RoundModel): Promise<number | undefined> {
    if (!(await this.gameRepositoryPort.checkIfExistById(roundModel.getGameId()))) {
      throw new DataNotFoundError(GameService.GAME_NOT_FOUND);
    }
    const winner = this.findWinner(roundModel.getMovementUserOne(), roundModel.getMovementUserTwo());
    if (winner !== undefined) {
      roundModel.setWinner(winner);
      await this.roundRepositoryPort.saveRoundMovements(roundModel);
      return winner;
    } else {
      throw new UnexpectedGameError(
        GameService.NO_ROUND_WINNER_FOUND(roundModel.getMovementUserOne(), roundModel.getMovementUserTwo()),
      );
    }
  }

  private findWinner(movementUOne: AvailableMovementsEnum, movementUTwo: AvailableMovementsEnum): number | undefined {
    if (movementUOne === movementUTwo) {
      return -1;
    } else if (movementUOne === AvailableMovementsEnum.ROCK) {
      if (movementUTwo === AvailableMovementsEnum.SCISSORS) {
        return 1;
      } else {
        return 2;
      }
    } else if (movementUOne === AvailableMovementsEnum.SCISSORS) {
      if (movementUTwo === AvailableMovementsEnum.ROCK) {
        return 2;
      } else {
        return 1;
      }
    } else if (movementUOne === AvailableMovementsEnum.PAPER) {
      if (movementUTwo === AvailableMovementsEnum.SCISSORS) {
        return 2;
      } else {
        return 1;
      }
    }
  }
}
