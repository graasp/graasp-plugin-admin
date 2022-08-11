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

import { AdminService } from '../db-service';

export abstract class BaseAdminTask<R> implements Task<Actor, R> {
  protected adminService: AdminService;
  protected _result!: R;
  protected _message!: string;

  readonly actor: Actor;

  status: TaskStatus;
  targetId!: string;
  data!: Partial<IndividualResultType<R>>;
  preHookHandler!: PreHookHandlerType<R>;
  postHookHandler!: PostHookHandlerType<R>;

  constructor(actor: Actor, adminService: AdminService) {
    this.actor = actor;
    this.adminService = adminService;
    this.status = TaskStatus.NEW;
  }

  abstract get name(): string;
  get result(): R {
    return this._result;
  }
  get message(): string {
    return this._message;
  }

  abstract run(
    handler: DatabaseTransactionHandler,
    log?: FastifyLoggerInstance,
  ): Promise<void | BaseAdminTask<R>[]>;
}
