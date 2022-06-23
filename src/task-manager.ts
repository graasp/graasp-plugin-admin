// global
import { Member } from 'graasp';
import { AdminService } from './db-service';
import { IsAdminTask } from './tasks/is-admin-task';
// local

export class TaskManager {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  getIsAdminTaskName(): string {
    return IsAdminTask.name;
  }

  createIsAdminTask(member: Member): IsAdminTask {
    return new IsAdminTask(member, this.adminService);
  }
}
