import { Provider, inject, BindingKey } from '@loopback/core';
import { BootGameAppService } from '../../app/application/service/boot-game.app.service';
import { USER_SERVICE } from '../domain/user.service.provider';
import { UserService } from '../../app/domain/service/user.service';
import { USER_APP_MAPPER } from './user.app.mapper.provider';
import { UserAppMapper } from '../../app/application/mapper/user.app.mapper';
import { PLAYERS_SAVED_APP_MAPPER } from './players-saved.app.mapper.provider';
import { PlayersSavedAppMapper } from '../../app/application/mapper/players-saved.app.mapper';
import { GAME_SERVICE } from '../domain/game.service.provider';
import { GameService } from '../../app/domain/service/game.service';

export class BootGameAppServiceProvider implements Provider<BootGameAppService> {
  private readonly userAppService: BootGameAppService;
  constructor(
    @inject(USER_SERVICE) private userService: UserService,
    @inject(USER_APP_MAPPER) private userAppMapper: UserAppMapper,
    @inject(PLAYERS_SAVED_APP_MAPPER) private playersSavedAppMapper: PlayersSavedAppMapper,
    @inject(GAME_SERVICE) private gameService: GameService,
  ) {
    this.userAppService = new BootGameAppService(
      this.userService,
      this.userAppMapper,
      this.playersSavedAppMapper,
      this.gameService,
    );
  }

  value(): BootGameAppService {
    return this.userAppService;
  }
}

export const BOOT_GAME_APP_SERVICE = BindingKey.create<BootGameAppService>('app.service.boot-game');
