import {SinonStubbedInstance} from 'sinon';
import {expect, sinon} from '@loopback/testlab';
import {GameRepositoryPort} from '../../../../app/domain/port/game.repository.port';
import {GameService} from '../../../../app/domain/service/game.service';
import {GameRepositoryAdapter} from '../../../../app/infrastructure/repository/game.repository.adapter';
import {UserRepositoryPort} from '../../../../app/domain/port/user.repository.port';
import {UserRepositoryAdapter} from '../../../../app/infrastructure/repository/user.repository.adapter';
import {DataNotFoundError} from '../../../../app/domain/error/data-not-found.error';
import {RoundRepositoryPort} from '../../../../app/domain/port/round.repository.port';
import {RoundRepositoryAdapter} from '../../../../app/infrastructure/repository/round.repository.adapter';
import {RoundBuilder} from "../../../builder/round.builder";
import {AvailableMovementsEnum} from "../../../../app/domain/model/available-movements.enum";

describe('GameService', () => {
  const userOneNickname = 'userOne';
  const userTwoNickname = 'userTwo';
  const gameId = 1;

  let gameRepositoryStub: SinonStubbedInstance<GameRepositoryPort>;
  let userRepositoryStub: SinonStubbedInstance<UserRepositoryPort>;
  let roundRepositoryStub: SinonStubbedInstance<RoundRepositoryPort>;
  let testedClass: GameService;

  beforeEach(() => {
    gameRepositoryStub = sinon.createStubInstance(GameRepositoryAdapter);
    userRepositoryStub = sinon.createStubInstance(UserRepositoryAdapter);
    roundRepositoryStub = sinon.createStubInstance(RoundRepositoryAdapter);
    testedClass = new GameService(gameRepositoryStub, userRepositoryStub, roundRepositoryStub);
  });

  it('should thrown DataNotFoundError when userOne not exist', async function() {
    // Arrange
    userRepositoryStub.checkIfExistByNickName.withArgs(userOneNickname).returns(
      new Promise(resolve => {
        resolve(false);
      }),
    );

    userRepositoryStub.checkIfExistByNickName.withArgs(userTwoNickname).returns(
      new Promise(resolve => {
        resolve(true);
      }),
    );

    gameRepositoryStub.createGame.returns(
      new Promise(resolve => {
        resolve(gameId);
      }),
    );

    // Act - Assert
    await expect(testedClass.createGame(userOneNickname, userTwoNickname)).rejectedWith(
      new DataNotFoundError(GameService.USER_ONE_NOT_FOUND),
    );
  });

  it('should thrown DataNotFoundError when userTwo not exist', async function() {
    // Arrange
    userRepositoryStub.checkIfExistByNickName.withArgs(userOneNickname).returns(
      new Promise(resolve => resolve(true)),
    );

    userRepositoryStub.checkIfExistByNickName.withArgs(userTwoNickname).returns(
      new Promise(resolve => resolve(false)),
    );

    gameRepositoryStub.createGame.returns(
      new Promise(resolve => resolve(gameId)),
    );

    // Act - Assert
    await expect(testedClass.createGame(userOneNickname, userTwoNickname)).rejectedWith(
      new DataNotFoundError(GameService.USER_TWO_NOT_FOUND),
    );
  });

  it('should create game correctly and return gameId', async function() {
    // Arrange
    userRepositoryStub.checkIfExistByNickName.returns(
      new Promise(resolve => resolve(true)),
    );

    gameRepositoryStub.createGame.returns(
      new Promise(resolve => resolve(gameId)),
    );

    // Act - Assert
    const response = await testedClass.createGame(userOneNickname, userTwoNickname);

    expect(response).to.eql(gameId);
  });

  describe('Game Logic:', function () {

    it('should throw DataNotFoundError due to game is not started', async function () {
      // Arrange
      const round = new RoundBuilder().build();
      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(false))
      );

      // Act - Assert
      await expect(testedClass.playRound(round)).rejectedWith(
          new DataNotFoundError(GameService.GAME_NOT_FOUND),
      );
    });

    it('should win user one: PAPER vs ROCK', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.PAPER)
      .withMovementUserTwo(AvailableMovementsEnum.ROCK).build();
      const expectedWinner = 1;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });

    it('should win user two: PAPER vs SCISSORS', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.PAPER)
      .withMovementUserTwo(AvailableMovementsEnum.SCISSORS).build();
      const expectedWinner = 2;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });

    it('should win user two: SCISSORS vs ROCK', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.SCISSORS)
      .withMovementUserTwo(AvailableMovementsEnum.ROCK).build();
      const expectedWinner = 2;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });

    it('should win user one: SCISSORS vs PAPER', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.SCISSORS)
      .withMovementUserTwo(AvailableMovementsEnum.PAPER).build();
      const expectedWinner = 1;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });

    it('should win user two: ROCK vs PAPER', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.ROCK)
      .withMovementUserTwo(AvailableMovementsEnum.PAPER).build();
      const expectedWinner = 2;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });

    it('should win user one: ROCK vs SCISSORS', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.ROCK)
      .withMovementUserTwo(AvailableMovementsEnum.SCISSORS).build();
      const expectedWinner = 1;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });

    it('should be a tie game: ROCK vs ROCK', async function () {
      const round = new RoundBuilder().withMovementUserOne(AvailableMovementsEnum.ROCK)
      .withMovementUserTwo(AvailableMovementsEnum.ROCK).build();
      const expectedWinner = -1;

      gameRepositoryStub.checkIfExistById.returns(
          new Promise(resolve => resolve(true))
      );

      const winner = await testedClass.playRound(round);

      expect(winner).to.eql(expectedWinner);
    });
  });
});
