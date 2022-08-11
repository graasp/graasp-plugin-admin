import { Actor, AdminTaskManager, Member, Task } from '@graasp/sdk';

import { AdminMemberService } from './db-service';
import { GetAllTask } from './tasks/get-all-task';

export class AdminMemberTaskManager {
  adminMemberService: AdminMemberService;
  adminTaskManager: AdminTaskManager;
  adminRoleId?: string;

  constructor(
    adminTaskManager: AdminTaskManager,
    adminMemberService: AdminMemberService,
    adminRoleId: string,
  ) {
    this.adminTaskManager = adminTaskManager;
    this.adminRoleId = adminRoleId;
    this.adminMemberService = adminMemberService;
  }

  createGetAllTaskSequence(member: Member): Task<Actor, unknown>[] {
    const t1 = this.adminTaskManager.createGetMemberRolesTask(member, {
      validateRoleId: this.adminRoleId,
    }) as Task<Actor, unknown>;
    const t2 = new GetAllTask(member, this.adminMemberService) as Task<Actor, unknown>;
    return [t1, t2];
  }
}
