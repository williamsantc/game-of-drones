import { requestBody, post, getModelSchemaRef } from '@loopback/rest';
import { inject } from '@loopback/context';
import { BOOT_GAME_APP_SERVICE } from '../../../providers/application/boot-game.app.service.provider';
import { BootGameAppService } from '../../application/service/boot-game.app.service';
import { PlayersType } from '../../application/type/players.type';
import * as HttpStatus from 'http-status-codes';
import { MediaType } from '../config/media-type';
import { GameStartedType } from '../../application/type/game-started.type';

/**
 * User controller
 */
export class BootGameController {
  constructor(@inject(BOOT_GAME_APP_SERVICE) private bootGameAppService: BootGameAppService) {}

  @post('/api/save-players', {
    responses: {
      [HttpStatus.OK]: {
        description: 'Save the players and start a game',
        content: {
          [MediaType.APPLICATION_JSON]: { schema: getModelSchemaRef(GameStartedType) },
        },
      },
    },
  })
  async savePlayers(
    @requestBody({
      content: {
        [MediaType.APPLICATION_JSON]: { schema: getModelSchemaRef(PlayersType) },
      },
    })
    players: PlayersType,
  ) {
    return this.bootGameAppService.bootGame(players);
  }
}
