import { RoundModel } from '../../app/domain/model/round.model';
import { RoundBuilder } from '../builder/round.builder';

export class RoundMock {
  public static getListMock(gameId = 1): RoundModel[] {
    const roundList: RoundModel[] = [];
    roundList.push(new RoundBuilder().withGameId(gameId).build());
    return roundList;
  }
}
