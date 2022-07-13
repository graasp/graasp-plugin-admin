// global
import { DatabaseTransactionHandler, Member } from 'graasp';
import { AdminService } from '../db-service';
import { MemberRole } from '../types';
// local
import { BaseAdminTask } from './base-admin-task';

export class GetMemberRolesTask extends BaseAdminTask<MemberRole[]> {

  get name(): string {
    return GetMemberRolesTask.name;
  }

  constructor(member: Member, adminService: AdminService) {
    super(member, adminService);
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get member role
    const { id: memberId } = this.actor;
    const memberRoles = await this.adminService.getMemberRole(memberId, handler);

    this._result = memberRoles;
    this.status = 'OK';
  }
}
