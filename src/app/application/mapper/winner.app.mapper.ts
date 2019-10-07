import { WinnerModel } from '../../domain/model/winner.model';
import { WinnerType } from '../type/winner.type';

export class WinnerAppMapper {
  public domainToType(winnerModel: WinnerModel): WinnerType {
    const winnerType = new WinnerType();
    winnerType.winner = winnerModel.getWinner();
    winnerType.continuePlaying = winnerModel.getContinuePlaying();
    return winnerType;
  }
}
