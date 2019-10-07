import { belongsTo, Entity, model, property } from '@loopback/repository';
import { GameEntity } from './game.entity';

@model()
export class RoundEntity extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @belongsTo(() => GameEntity)
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

  @property({
    type: 'number',
    required: true,
  })
  winner: number;

  @property({
    default: new Date(),
    type: 'date',
  })
  movementCreationTime: Date;
}
