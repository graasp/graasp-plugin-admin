import { Member, AdminTaskManager as TaskManager } from '@graasp/sdk';

import { AdminService } from './db-service';
import { GetMemberRolesTask } from './tasks/get-member-roles-task';

export class AdminTaskManager implements TaskManager {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  createGetMemberRolesTask(member: Member, { validateRoleId }: { validateRoleId?: string } = {}) {
    return new GetMemberRolesTask(member, this.adminService, { validateRoleId });
  }
}
