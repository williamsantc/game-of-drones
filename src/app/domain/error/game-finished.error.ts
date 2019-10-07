export class GameFinishedError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = GameFinishedError.name;
  }
}
