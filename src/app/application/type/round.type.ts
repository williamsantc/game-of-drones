import { model, property } from '@loopback/repository';

@model()
export class RoundType {
  @property({
    type: 'number',
    required: true,
  })
  gameId: number;
  @property({
    type: 'string',
    required: true,
  })
  movementUserOne: string;
  @property({
    type: 'string',
    required: true,
  })
  movementUserTwo: string;
}
