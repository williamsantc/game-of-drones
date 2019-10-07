import { BindingKey, inject, Provider } from '@loopback/context';
import { GameService } from '../../app/domain/service/game.service';
import { GAME_REPOSITORY } from '../infrastructure/game.repository.provider';
import { GameRepositoryPort } from '../../app/domain/port/game.repository.port';
import { USER_REPOSITORY } from '../infrastructure/user.repository.provider';
import { UserRepositoryPort } from '../../app/domain/port/user.repository.port';
import { ROUND_REPOSITORY } from '../infrastructure/round.repository.provider';
import { RoundRepositoryPort } from '../../app/domain/port/round.repository.port';

export class GameServiceProvider implements Provider<GameService> {
  private readonly gameService: GameService;
  constructor(
    @inject(GAME_REPOSITORY) private gameRepositoryPort: GameRepositoryPort,
    @inject(USER_REPOSITORY) private userRepositoryPort: UserRepositoryPort,
    @inject(ROUND_REPOSITORY) private roundRepositoryPort: RoundRepositoryPort,
  ) {
    this.gameService = new GameService(this.gameRepositoryPort, this.userRepositoryPort, this.roundRepositoryPort);
  }
  value(): GameService {
    return this.gameService;
  }
}

export const GAME_SERVICE = BindingKey.create<GameService>('domain.service.game');
