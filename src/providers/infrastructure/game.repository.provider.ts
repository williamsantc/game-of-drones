import { BindingKey, Provider } from '@loopback/context';
import { GameRepositoryPort } from '../../app/domain/port/game.repository.port';
import { repository } from '@loopback/repository';
import { GameLoopbackRepository } from '../../app/infrastructure/repository/loopback';
import { GameRepositoryAdapter } from '../../app/infrastructure/repository/game.repository.adapter';

export class GameRepositoryProvider implements Provider<GameRepositoryPort> {
  private readonly gameRepositoryPort: GameRepositoryPort;
  constructor(@repository(GameLoopbackRepository) private gameLbRepo: GameLoopbackRepository) {
    this.gameRepositoryPort = new GameRepositoryAdapter(this.gameLbRepo);
  }
  value(): GameRepositoryPort {
    return this.gameRepositoryPort;
  }
}

export const GAME_REPOSITORY = BindingKey.create<GameRepositoryPort>('inf.repository.game');
