import { BindingKey, inject, Provider } from '@loopback/context';
import { RoundAppService } from '../../app/application/service/round.app.service';
import { ROUND_APP_MAPPER } from './round.app.mapper.provider';
import { RoundAppMapper } from '../../app/application/mapper/round.app.mapper';
import { GAME_SERVICE } from '../domain/game.service.provider';
import { GameService } from '../../app/domain/service/game.service';
import { WINNER_APP_MAPPER } from './winner.app.mapper.provider';
import { WinnerAppMapper } from '../../app/application/mapper/winner.app.mapper';

export class RoundAppServiceProvider implements Provider<RoundAppService> {
  private readonly roundAppService: RoundAppService;
  constructor(
    @inject(ROUND_APP_MAPPER) private roundAppMapper: RoundAppMapper,
    @inject(GAME_SERVICE) private gameService: GameService,
    @inject(WINNER_APP_MAPPER) private winnerAppMapper: WinnerAppMapper,
  ) {
    this.roundAppService = new RoundAppService(this.gameService, this.roundAppMapper, this.winnerAppMapper);
  }
  value(): RoundAppService {
    return this.roundAppService;
  }
}

export const ROUND_APP_SERVICE = BindingKey.create<RoundAppService>('app.service.round');
