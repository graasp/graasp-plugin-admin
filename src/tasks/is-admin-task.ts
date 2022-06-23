// global
import { DatabaseTransactionHandler, Member } from 'graasp';
import { ADMIN_ROLE_ID } from '../constants';
import { AdminService } from '../db-service';
// local
import { BaseAdminTask } from './base-admin-task';

export class IsAdminTask extends BaseAdminTask<boolean> {

  get name(): string {
    return IsAdminTask.name;
  }

  constructor(member: Member, adminService: AdminService) {
    super(member, adminService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get member role
    const { id: memberId } = this.actor;
    const memberRole = await this.adminService.getMemberRole(memberId, handler);
    // QUESTION: get the ADMIN_ROLE_ID from DB, or as a plugin option?
    this._result = memberRole?.id === ADMIN_ROLE_ID;
    this.status = 'OK';
  }
}
