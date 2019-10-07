import { BindingKey, inject, Provider } from '@loopback/context';
import { RoundAppService } from '../../app/application/service/round.app.service';
import { ROUND_APP_MAPPER } from './round.app.mapper.provider';
import { RoundAppMapper } from '../../app/application/mapper/round.app.mapper';
import { GAME_SERVICE } from '../domain/game.service.provider';
import { GameService } from '../../app/domain/service/game.service';

export class RoundAppServiceProvider implements Provider<RoundAppService> {
  private readonly roundAppService: RoundAppService;
  constructor(
    @inject(ROUND_APP_MAPPER) private roundAppMapper: RoundAppMapper,
    @inject(GAME_SERVICE) private gameService: GameService,
  ) {
    this.roundAppService = new RoundAppService(this.gameService, this.roundAppMapper);
  }
  value(): RoundAppService {
    return this.roundAppService;
  }
}

export const ROUND_APP_SERVICE = BindingKey.create<RoundAppService>('app.service.round');
