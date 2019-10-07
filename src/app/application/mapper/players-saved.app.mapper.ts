import { PlayersSavedModel } from '../../domain/model/players-saved.model';
import { GameStartedType } from '../type/game-started.type';

export class PlayersSavedAppMapper {
  domainToType(playersSaved: PlayersSavedModel, gameId: number): GameStartedType {
    return {
      pOneExist: playersSaved.getPOneExist(),
      pTwoExist: playersSaved.getPTwoExist(),
      gameId,
    };
  }
}
