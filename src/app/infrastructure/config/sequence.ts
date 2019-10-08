import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import { DataNotFoundError } from '../../domain/error/data-not-found.error';
import * as HttpStatus from 'http-status-codes';
import { RequiredValueError } from '../../domain/error/required-value.error';
import { InvalidMovementError } from '../../domain/error/invalid-movement.error';
import { UnexpectedGameError } from '../../domain/error/unexpected-game.error';
import { GameFinishedError } from '../../domain/error/game-finished.error';
import {EqualsNicknameError} from "../../domain/error/equals-nickname.error";

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  private readonly ERROR_CATALOG: Map<string, number> = new Map();

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
  ) {
    this.ERROR_CATALOG.set(DataNotFoundError.name, HttpStatus.NOT_FOUND);
    this.ERROR_CATALOG.set(RequiredValueError.name, HttpStatus.BAD_REQUEST);
    this.ERROR_CATALOG.set(InvalidMovementError.name, HttpStatus.BAD_REQUEST);
    this.ERROR_CATALOG.set(GameFinishedError.name, HttpStatus.BAD_REQUEST);
    this.ERROR_CATALOG.set(EqualsNicknameError.name, HttpStatus.BAD_REQUEST);
    this.ERROR_CATALOG.set(UnexpectedGameError.name, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async handle(context: RequestContext) {
    try {
      const { request, response } = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      const statusCode = this.ERROR_CATALOG.get(err.name);
      if (statusCode) {
        Object.assign(err, { statusCode });
      }
      this.reject(context, err);
    }
  }
}
