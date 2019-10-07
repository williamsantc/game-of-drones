export interface GameRepositoryPort {
  /**
   * Start a new game in the app
   *
   * @param nicknameUserOne nickname of user one
   * @param nicknameUserTwo nickname of user two
   *
   * @returns game id as a promise
   *
   */
  createGame(nicknameUserOne: string, nicknameUserTwo: string): Promise<number>;

  /**
   * Check if the game is already started by its id
   *
   * @param gameId game id
   *
   * @returns true or false as a promise
   * */
  checkIfExistById(gameId: number): Promise<boolean>;
}
