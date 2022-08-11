import { FastifyLoggerInstance } from 'fastify';

import {
  Actor,
  DatabaseTransactionHandler,
  IndividualResultType,
  PostHookHandlerType,
  PreHookHandlerType,
  Task,
  TaskStatus,
} from '@graasp/sdk';

import { AdminItemService } from '../db-service';

export abstract class BaseAdminItemTask<R> implements Task<Actor, R> {
  protected adminItemService: AdminItemService;
  protected _result?: R;
  protected _message?: string;
  readonly actor: Actor;
  protected _partialSubtasks?: boolean;

  status: TaskStatus;
  targetId?: string;
  data?: Partial<IndividualResultType<R>>;
  preHookHandler?: PreHookHandlerType<R>;
  postHookHandler?: PostHookHandlerType<R>;

  getInput?: () => unknown;
  getResult?: () => unknown;

  constructor(actor: Actor, adminItemService: AdminItemService) {
    this.actor = actor;
    this.status = TaskStatus.NEW;
    this.adminItemService = adminItemService;
  }

  abstract get name(): string;
  get result(): R | undefined {
    return this._result;
  }
  get message(): string | undefined {
    return this._message;
  }
  get partialSubtasks(): boolean | undefined {
    return this._partialSubtasks;
  }

  input?: unknown;
  skip?: boolean;

  abstract run(
    handler: DatabaseTransactionHandler,
    log: FastifyLoggerInstance,
  ): Promise<void | BaseAdminItemTask<R>[]>;
}
