// global
import { Member } from 'graasp';
import { AdminService } from './db-service';
import { GetMemberRolesTask } from './tasks/get-member-roles-task';
// local

export class TaskManager {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  getIsAdminTaskName(): string {
    return GetMemberRolesTask.name;
  }

  createIsAdminTask(member: Member): GetMemberRolesTask {
    return new GetMemberRolesTask(member, this.adminService);
  }
}
