import { Entity, model, property } from '@loopback/repository';

@model()
export class UserEntity extends Entity {
  @property({ unique: true, id: true, required: true })
  userNickname: string;

  @property({ default: new Date() })
  userCreationTime: Date;
}
