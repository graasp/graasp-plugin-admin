import { DatabaseTransactionHandler, Member, TaskStatus } from '@graasp/sdk';

import { AdminMemberService } from '../db-service';
import { BaseAdminItemTask } from './base-admin-item-task';

export class GetAllTask extends BaseAdminItemTask<readonly Member[]> {
  get name(): string {
    return GetAllTask.name;
  }

  constructor(member: Member, adminMemberService: AdminMemberService) {
    super(member, adminMemberService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    const members = await this.adminMemberService.getAll(handler);

    this._result = members;
    this.status = TaskStatus.OK;
  }
}
