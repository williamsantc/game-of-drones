import { expect } from '@loopback/testlab';
import { UserModel } from '../../../../app/domain/model/user.model';
import { RequiredValueError } from '../../../../app/domain/error/required-value.error';

describe('UserModel', () => {
  it('should thrown RequiredValueError with empty nickname', async function() {
    // Arrange
    const nickname = '';

    // Act - Assert
    await expect(new Promise(resolve => resolve(new UserModel(nickname)))).rejectedWith(
      new RequiredValueError(UserModel.NICKNAME_REQUIRED),
    );
  });
});
