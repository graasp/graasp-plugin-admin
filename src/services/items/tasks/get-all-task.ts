import { DatabaseTransactionHandler, Item, Member, TaskStatus } from '@graasp/sdk';

import { QueryFilters } from '../../../constants';
import { AdminItemService } from '../db-service';
import { BaseAdminItemTask } from './base-admin-item-task';

export class GetAllTask extends BaseAdminItemTask<Item[]> {
  filters: QueryFilters;

  get name(): string {
    return GetAllTask.name;
  }

  constructor(member: Member, adminItemService: AdminItemService, filters: QueryFilters) {
    super(member, adminItemService);
    this.filters = filters;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    const items = await this.adminItemService.getAll(this.filters, handler);

    this._result = items as Item[];
    this.status = TaskStatus.OK;
  }
}
