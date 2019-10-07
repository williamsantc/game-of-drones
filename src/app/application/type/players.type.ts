import { UserType } from './user.type';
import { model, property } from '@loopback/repository';

@model()
export class PlayersType {
  @property({
    type: 'object',
    required: true,
  })
  userOne: UserType;

  @property({
    type: 'object',
    required: true,
  })
  userTwo: UserType;
}
