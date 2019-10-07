import { model, property } from '@loopback/repository';

@model()
export class UserType {
  @property({
    type: 'string',
    required: true,
  })
  userNickname: string;
}
