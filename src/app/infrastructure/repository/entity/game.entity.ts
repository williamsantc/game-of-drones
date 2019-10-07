import { belongsTo, Entity, model, property } from '@loopback/repository';
import { UserEntity } from './user.entity';

@model()
export class GameEntity extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @belongsTo(() => UserEntity)
  userOneNickname: string;

  @belongsTo(() => UserEntity)
  userTwoNickname: string;

  @property({ default: new Date() })
  gameCreationTime: Date;
}
