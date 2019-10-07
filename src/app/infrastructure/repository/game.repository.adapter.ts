import { GameRepositoryPort } from '../../domain/port/game.repository.port';
import { GameLoopbackRepository } from './loopback';
import { GameEntity } from './entity/game.entity';

export class GameRepositoryAdapter implements GameRepositoryPort {
  constructor(private gameLpRepo: GameLoopbackRepository) {}

  async createGame(nicknameUserOne: string, nicknameUserTwo: string): Promise<number> {
    const gameEntity = new GameEntity();
    gameEntity.userOneNickname = nicknameUserOne;
    gameEntity.userTwoNickname = nicknameUserTwo;
    return (await this.gameLpRepo.save(gameEntity)).id;
  }

  async checkIfExistById(gameId: number): Promise<boolean> {
    return this.gameLpRepo.exists(gameId);
  }
}
