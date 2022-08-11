import { DatabaseTransactionHandler, Item, Member, TaskStatus } from '@graasp/sdk';

import { AdminItemService } from '../db-service';
import { BaseAdminItemTask } from './base-admin-item-task';

export class GetAllTask extends BaseAdminItemTask<Item[]> {
  get name(): string {
    return GetAllTask.name;
  }

  constructor(member: Member, adminItemService: AdminItemService) {
    super(member, adminItemService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    const items = await this.adminItemService.getAll(handler);

    this._result = items as Item[];
    this.status = TaskStatus.OK;
  }
}
