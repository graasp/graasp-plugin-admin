import { FastifyLoggerInstance } from 'fastify';

import { TaskStatus } from '@graasp/sdk';
import {
  Actor,
  DatabaseTransactionHandler,
  IndividualResultType,
  PostHookHandlerType,
  PreHookHandlerType,
  Task,
} from '@graasp/sdk';

import { AdminMemberService } from '../db-service';

export abstract class BaseAdminItemTask<R> implements Task<Actor, R> {
  // protected adminService: AdminService;
  protected adminMemberService: AdminMemberService;
  protected _result!: R;
  protected _message!: string;

  readonly actor: Actor;

  status: TaskStatus;
  targetId!: string;
  data!: Partial<IndividualResultType<R>>;
  preHookHandler!: PreHookHandlerType<R>;
  postHookHandler!: PostHookHandlerType<R>;

  constructor(actor: Actor, adminMemberService: AdminMemberService) {
    this.actor = actor;
    this.adminMemberService = adminMemberService;
    // this.adminService = adminService;
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
  ): Promise<void | BaseAdminItemTask<R>[]>;
}
