import { expect } from '@loopback/testlab';
import { RoundModel } from '../../../../app/domain/model/round.model';
import { InvalidMovementError } from '../../../../app/domain/error/invalid-movement.error';
import { AvailableMovements } from '../../../../app/domain/model/available-movements.enum';

describe('RoundModel', () => {
  const gameId = 1;

  it('should throw InvalidMovementError on user one unknown movement', async function() {
    // Arrange
    const movementUserOne = 'FLOW';
    const movementUserTwo = 'ROCK';

    // Act - Assert
    await expect(
      new Promise(resolve => resolve(new RoundModel(gameId, movementUserOne, movementUserTwo))),
    ).rejectedWith(new InvalidMovementError(AvailableMovements.INVALID_MOVEMENT(movementUserOne)));
  });

  it('should throw InvalidMovementError on user two unknown movement', async function() {
    // Arrange
    const movementUserOne = 'PAPER';
    const movementUserTwo = 'GIT';

    // Act - Assert
    await expect(
      new Promise(resolve => resolve(new RoundModel(gameId, movementUserOne, movementUserTwo))),
    ).rejectedWith(new InvalidMovementError(AvailableMovements.INVALID_MOVEMENT(movementUserTwo)));
  });

  it('should build correctly Round object', function() {
    // Arrange
    const movementUserOne = 'PAPER';
    const movementUserTwo = 'ROCK';

    // Act
    const round = new RoundModel(gameId, movementUserOne, movementUserTwo);

    // Assert
    expect(round.getMovementUserOne()).to.eql(movementUserOne);
    expect(round.getMovementUserTwo()).to.eql(movementUserTwo);
  });
});
