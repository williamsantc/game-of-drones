import { GameService } from '../../domain/service/game.service';
import { RoundAppMapper } from '../mapper/round.app.mapper';
import { RoundType } from '../type/round.type';
import { WinnerType } from '../type/winner.type';
import { WinnerAppMapper } from '../mapper/winner.app.mapper';

export class RoundAppService {
  constructor(
    private gameService: GameService,
    private roundAppMapper: RoundAppMapper,
    private winnerAppMapper: WinnerAppMapper,
  ) {}

  async playRound(roundType: RoundType): Promise<WinnerType | undefined> {
    const winner = await this.gameService.playRound(this.roundAppMapper.typeToDomain(roundType));
    if (winner) {
      return this.winnerAppMapper.domainToType(winner);
    }
  }
}
