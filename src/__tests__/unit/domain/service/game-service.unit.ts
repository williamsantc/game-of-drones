import { SinonStubbedInstance } from 'sinon';
import { expect, sinon } from '@loopback/testlab';
import { GameRepositoryPort } from '../../../../app/domain/port/game.repository.port';
import { GameService } from '../../../../app/domain/service/game.service';
import { GameRepositoryAdapter } from '../../../../app/infrastructure/repository/game.repository.adapter';
import { UserRepositoryPort } from '../../../../app/domain/port/user.repository.port';
import { UserRepositoryAdapter } from '../../../../app/infrastructure/repository/user.repository.adapter';
import { DataNotFoundError } from '../../../../app/domain/error/data-not-found.error';
import { RoundRepositoryPort } from '../../../../app/domain/port/round.repository.port';
import { RoundRepositoryAdapter } from '../../../../app/infrastructure/repository/round.repository.adapter';
import { RoundBuilder } from '../../../builder/round.builder';
import { AvailableMovementsEnum } from '../../../../app/domain/model/available-movements.enum';
import { RoundMock } from '../../../mock/round.mock';
import { RoundWinnerEnum } from '../../../../app/domain/model/round-winner.enum';
import { RoundModel } from '../../../../app/domain/model/round.model';
import { GameFinishedError } from '../../../../app/domain/error/game-finished.error';

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
    userRepositoryStub.checkIfExistByNickName.withArgs(userOneNickname).returns(new Promise(resolve => resolve(true)));

    userRepositoryStub.checkIfExistByNickName.withArgs(userTwoNickname).returns(new Promise(resolve => resolve(false)));

    gameRepositoryStub.createGame.returns(new Promise(resolve => resolve(gameId)));

    // Act - Assert
    await expect(testedClass.createGame(userOneNickname, userTwoNickname)).rejectedWith(
      new DataNotFoundError(GameService.USER_TWO_NOT_FOUND),
    );
  });

  it('should create game correctly and return gameId', async function() {
    // Arrange
    userRepositoryStub.checkIfExistByNickName.returns(new Promise(resolve => resolve(true)));

    gameRepositoryStub.createGame.returns(new Promise(resolve => resolve(gameId)));

    // Act - Assert
    const response = await testedClass.createGame(userOneNickname, userTwoNickname);

    expect(response).to.eql(gameId);
  });

  describe('Game Logic:', function() {
    it('should throw DataNotFoundError due to game is not started', async function() {
      // Arrange
      const round = new RoundBuilder().build();
      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(false)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      // Act - Assert
      await expect(testedClass.playRound(round)).rejectedWith(new DataNotFoundError(GameService.GAME_NOT_FOUND));
    });

    it('should win user one: PAPER vs ROCK', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.PAPER)
        .withMovementUserTwo(AvailableMovementsEnum.ROCK)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.USER_ONE);
      }
    });

    it('should win user two: PAPER vs SCISSORS', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.PAPER)
        .withMovementUserTwo(AvailableMovementsEnum.SCISSORS)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.USER_TWO);
      }
    });

    it('should win user two: SCISSORS vs ROCK', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.SCISSORS)
        .withMovementUserTwo(AvailableMovementsEnum.ROCK)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.USER_TWO);
      }
    });

    it('should win user one: SCISSORS vs PAPER', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.SCISSORS)
        .withMovementUserTwo(AvailableMovementsEnum.PAPER)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.USER_ONE);
      }
    });

    it('should win user two: ROCK vs PAPER', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.ROCK)
        .withMovementUserTwo(AvailableMovementsEnum.PAPER)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.USER_TWO);
      }
    });

    it('should win user one: ROCK vs SCISSORS', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.ROCK)
        .withMovementUserTwo(AvailableMovementsEnum.SCISSORS)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.USER_ONE);
      }
    });

    it('should be a tie game: ROCK vs ROCK', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.ROCK)
        .withMovementUserTwo(AvailableMovementsEnum.ROCK)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(RoundMock.getListMock())));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getWinner()).to.eql(RoundWinnerEnum.TIE);
      }
    });

    it('should return continue playing false', async function() {
      const continuePlaying = false;
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.ROCK)
        .withMovementUserTwo(AvailableMovementsEnum.SCISSORS)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      const roundList: RoundModel[] = [];

      roundList.push(new RoundBuilder().withWinner(RoundWinnerEnum.USER_ONE).build());
      roundList.push(new RoundBuilder().withWinner(RoundWinnerEnum.USER_ONE).build());
      roundList.push(new RoundBuilder().withWinner(RoundWinnerEnum.USER_TWO).build());

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(roundList)));

      const winner = await testedClass.playRound(round);

      if (winner) {
        expect(winner.getContinuePlaying()).to.eql(continuePlaying);
      }
    });

    it('should throw GameFinishedError due to limit wins reached', async function() {
      const round = new RoundBuilder()
        .withMovementUserOne(AvailableMovementsEnum.ROCK)
        .withMovementUserTwo(AvailableMovementsEnum.SCISSORS)
        .build();

      gameRepositoryStub.checkIfExistById.returns(new Promise(resolve => resolve(true)));

      const roundList: RoundModel[] = [];

      roundList.push(new RoundBuilder().withWinner(RoundWinnerEnum.USER_ONE).build());
      roundList.push(new RoundBuilder().withWinner(RoundWinnerEnum.USER_ONE).build());
      roundList.push(new RoundBuilder().withWinner(RoundWinnerEnum.USER_ONE).build());

      roundRepositoryStub.findMovementsByGameId.returns(new Promise(resolve => resolve(roundList)));

      await expect(testedClass.playRound(round)).rejectedWith(new GameFinishedError(GameService.GAME_FINISHED));
    });
  });
});
