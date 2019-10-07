import { UserService } from '../../domain/service/user.service';
import { UserAppMapper } from '../mapper/user.app.mapper';
import { PlayersType } from '../type/players.type';
import { PlayersSavedAppMapper } from '../mapper/players-saved.app.mapper';
import { GameStartedType } from '../type/game-started.type';
import { GameService } from '../../domain/service/game.service';

export class BootGameAppService {
  constructor(
    private userService: UserService,
    private userAppMapper: UserAppMapper,
    private playerSavedMapper: PlayersSavedAppMapper,
    private gameService: GameService,
  ) {}

  async bootGame(players: PlayersType): Promise<GameStartedType> {
    return this.playerSavedMapper.domainToType(
      await this.userService.saveUsers(
        this.userAppMapper.typeToDomain(players.userOne),
        this.userAppMapper.typeToDomain(players.userTwo),
      ),
      await this.gameService.createGame(players.userOne.userNickname, players.userTwo.userNickname),
    );
  }
}
