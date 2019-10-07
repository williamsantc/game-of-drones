import { model, property } from '@loopback/repository';

@model()
export class WinnerType {
  @property({
    type: 'number',
    required: true,
  })
  winner: number;

  @property({
    type: 'boolean',
    required: true,
  })
  continuePlaying: boolean;
}
