import { GameRepositoryPort } from '../port/game.repository.port';
import { UserRepositoryPort } from '../port/user.repository.port';
import { DataNotFoundError } from '../error/data-not-found.error';
import { RoundRepositoryPort } from '../port/round.repository.port';
import { RoundModel } from '../model/round.model';
import { AvailableMovementsEnum } from '../model/available-movements.enum';
import { UnexpectedGameError } from '../error/unexpected-game.error';
import { RoundWinnerEnum } from '../model/round-winner.enum';
import { WinnerModel } from '../model/winner.model';
import { GameFinishedError } from '../error/game-finished.error';

export class GameService {
  public static readonly USER_ONE_NOT_FOUND = 'the user nickname one is not found';
  public static readonly USER_TWO_NOT_FOUND = 'the user nickname two is not found';
  public static readonly GAME_NOT_FOUND = 'the requested game is not found';
  public static readonly NO_ROUND_WINNER_FOUND = (movementOne: string, movementTwo: string) =>
    `The movements ${movementOne} and ${movementTwo} doesn't have a winning strategy`;
  public static readonly GAME_FINISHED = 'The game have already finished';
  public static readonly MAX_ROUND_WINS = 3;

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

  public async playRound(roundModel: RoundModel): Promise<WinnerModel | undefined> {
    if (!(await this.gameRepositoryPort.checkIfExistById(roundModel.getGameId()))) {
      throw new DataNotFoundError(GameService.GAME_NOT_FOUND);
    }
    const roundsPlayed = await this.roundRepositoryPort.findMovementsByGameId(roundModel.getGameId());

    if (!this.continuePlaying(roundsPlayed)) {
      throw new GameFinishedError(GameService.GAME_FINISHED);
    }
    const winner = this.findWinner(roundModel.getMovementUserOne(), roundModel.getMovementUserTwo());
    if (winner !== undefined) {
      roundModel.setWinner(winner);
      await this.roundRepositoryPort.saveRoundMovements(roundModel);
      roundsPlayed.push(roundModel);
      const continuePlaying = this.continuePlaying(roundsPlayed);
      return new WinnerModel(winner, continuePlaying);
    } else {
      throw new UnexpectedGameError(
        GameService.NO_ROUND_WINNER_FOUND(roundModel.getMovementUserOne(), roundModel.getMovementUserTwo()),
      );
    }
  }

  private continuePlaying(rounds: RoundModel[]): boolean {
    let useOneWins = 0;
    let userTwoWins = 0;
    rounds.forEach(round => {
      if (round.getWinner() === RoundWinnerEnum.USER_ONE) {
        useOneWins++;
      } else if (round.getWinner() === RoundWinnerEnum.USER_TWO) {
        userTwoWins++;
      }
    });
    return useOneWins < GameService.MAX_ROUND_WINS && userTwoWins < GameService.MAX_ROUND_WINS;
  }

  private findWinner(movementUOne: AvailableMovementsEnum, movementUTwo: AvailableMovementsEnum): number | undefined {
    if (movementUOne === movementUTwo) {
      return RoundWinnerEnum.TIE;
    } else if (movementUOne === AvailableMovementsEnum.ROCK) {
      if (movementUTwo === AvailableMovementsEnum.SCISSORS) {
        return RoundWinnerEnum.USER_ONE;
      } else {
        return RoundWinnerEnum.USER_TWO;
      }
    } else if (movementUOne === AvailableMovementsEnum.SCISSORS) {
      if (movementUTwo === AvailableMovementsEnum.ROCK) {
        return RoundWinnerEnum.USER_TWO;
      } else {
        return RoundWinnerEnum.USER_ONE;
      }
    } else if (movementUOne === AvailableMovementsEnum.PAPER) {
      if (movementUTwo === AvailableMovementsEnum.SCISSORS) {
        return RoundWinnerEnum.USER_TWO;
      } else {
        return RoundWinnerEnum.USER_ONE;
      }
    }
  }
}
