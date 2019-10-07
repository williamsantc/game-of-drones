import { model, property } from '@loopback/repository';

@model()
export class GameStartedType {
  @property({
    type: 'boolean',
    required: true,
  })
  pOneExist: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  pTwoExist: boolean;

  @property({
    type: 'number',
    required: true,
  })
  gameId: number;
}
