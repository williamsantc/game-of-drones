import { InvalidMovementError } from '../error/invalid-movement.error';

export enum AvailableMovementsEnum {
  PAPER = 'PAPER',
  ROCK = 'ROCK',
  SCISSORS = 'SCISSORS',
}

export class AvailableMovements {
  public static readonly INVALID_MOVEMENT = (movement: string) => `The movement ${movement} is not valid`;

  public static fromValue(movement: string): AvailableMovementsEnum {
    const movementAsEnum = AvailableMovementsEnum[movement as AvailableMovementsEnum];
    if (!movementAsEnum) {
      throw new InvalidMovementError(AvailableMovements.INVALID_MOVEMENT(movement));
    }
    return movementAsEnum;
  }
}
