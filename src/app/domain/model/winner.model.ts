export class WinnerModel {
  private readonly winner: number;
  private readonly continuePlaying: boolean;

  constructor(winner: number, continuePlaying: boolean) {
    this.winner = winner;
    this.continuePlaying = continuePlaying;
  }

  public getWinner() {
    return this.winner;
  }

  public getContinuePlaying() {
    return this.continuePlaying;
  }
}
