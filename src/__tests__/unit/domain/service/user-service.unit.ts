import { expect, sinon } from '@loopback/testlab';
import { SinonStubbedInstance } from 'sinon';
import { UserRepositoryPort } from '../../../../app/domain/port/user.repository.port';
import { UserService } from '../../../../app/domain/service/user.service';
import { UserRepositoryAdapter } from '../../../../app/infrastructure/repository/user.repository.adapter';
import { UserBuilder } from '../../../builder/user.builder';
import { UserModel } from '../../../../app/domain/model/user.model';

describe('UserService', () => {
  const userOneNickname = 'userOne';
  const userTwoNickname = 'userTwo';

  let userRepositoryStub: SinonStubbedInstance<UserRepositoryPort>;
  let testedClass: UserService;

  beforeEach(() => {
    userRepositoryStub = sinon.createStubInstance(UserRepositoryAdapter);
    testedClass = new UserService(userRepositoryStub);
  });

  it('test user one exist', async () => {
    // Arrange
    const userOne: UserModel = new UserBuilder().withNickname(userOneNickname).build();
    const userTwo: UserModel = new UserBuilder().withNickname(userTwoNickname).build();

    userRepositoryStub.checkIfExistByNickName.withArgs(userOneNickname).returns(
      new Promise(resolve => {
        resolve(true);
      }),
    );
    userRepositoryStub.checkIfExistByNickName.withArgs(userTwoNickname).returns(
      new Promise(resolve => {
        resolve(false);
      }),
    );

    // Act
    const response = await testedClass.saveUsers(userOne, userTwo);

    // Assert
    expect(response.getPOneExist()).to.eql(true);
    expect(response.getPTwoExist()).to.eql(false);
  });

  it('test user two exist', async () => {
    // Arrange
    const userOne: UserModel = new UserBuilder().withNickname(userOneNickname).build();
    const userTwo: UserModel = new UserBuilder().withNickname(userTwoNickname).build();

    userRepositoryStub.checkIfExistByNickName.withArgs(userOneNickname).returns(
      new Promise(resolve => {
        resolve(false);
      }),
    );
    userRepositoryStub.checkIfExistByNickName.withArgs(userTwoNickname).returns(
      new Promise(resolve => {
        resolve(true);
      }),
    );

    // Act
    const response = await testedClass.saveUsers(userOne, userTwo);

    // Assert
    expect(response.getPOneExist()).to.eql(false);
    expect(response.getPTwoExist()).to.eql(true);
  });
});
