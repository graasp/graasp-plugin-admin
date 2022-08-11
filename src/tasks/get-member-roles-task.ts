import { DatabaseTransactionHandler, Member, MemberRole, TaskStatus } from '@graasp/sdk';

import { AdminService } from '../db-service';
import { MemberNotAdmin } from '../errors';
import { BaseAdminTask } from './base-admin-task';

export class GetMemberRolesTask extends BaseAdminTask<MemberRole[]> {
  get name(): string {
    return GetMemberRolesTask.name;
  }

  // role id
  validateRoleId?: string;

  constructor(member: Member, adminService: AdminService, args: { validateRoleId?: string } = {}) {
    super(member, adminService);
    this.validateRoleId = args.validateRoleId;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = TaskStatus.RUNNING;

    // get member roles
    const { id: memberId } = this.actor;
    const memberRoles = await this.adminService.getMemberRoles(memberId, handler);

    // validate
    if (this.validateRoleId) {
      const matchingMemberRole = !memberRoles.find(({ roleId }) => {
        // todo: consider role hierarchy
        return roleId === this.validateRoleId;
      });
      if (matchingMemberRole) {
        throw new MemberNotAdmin(memberId);
      }
    }

    this._result = memberRoles;
    this.status = TaskStatus.OK;
  }
}
