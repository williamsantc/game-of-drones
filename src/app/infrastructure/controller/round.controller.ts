import { inject } from '@loopback/context';
import { ROUND_APP_SERVICE } from '../../../providers/application/round.app.service.provider';
import { RoundAppService } from '../../application/service/round.app.service';
import { RoundType } from '../../application/type/round.type';
import { getModelSchemaRef, post, requestBody } from '@loopback/openapi-v3';
import * as HttpStatus from 'http-status-codes';
import { MediaType } from '../config/media-type';
import { WinnerType } from '../../application/type/winner.type';

export class RoundController {
  constructor(@inject(ROUND_APP_SERVICE) private roundAppService: RoundAppService) {}

  @post('/api/play-round', {
    responses: {
      [HttpStatus.OK]: {
        description: 'play a round and returns the winner',
        content: {
          [MediaType.APPLICATION_JSON]: { schema: getModelSchemaRef(WinnerType) },
        },
      },
    },
  })
  async playRound(
    @requestBody({
      content: {
        [MediaType.APPLICATION_JSON]: { schema: getModelSchemaRef(RoundType) },
      },
    })
    roundType: RoundType,
  ) {
    return this.roundAppService.playRound(roundType);
  }
}
