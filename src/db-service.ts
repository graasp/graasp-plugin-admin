import { DatabaseTransactionConnection as TrxHandler, sql } from 'slonik';

import { MemberRole, AdminService as Service } from '@graasp/sdk';

/**
 * Database's first layer of abstraction for Admin DB services
 */
export class AdminService implements Service {
  protected adminRoleId: string;

  constructor(adminRoleId: string) {
    this.adminRoleId = adminRoleId;
  }
  /**
   * Get the role of given user
   * @param memberId
   * @param dbHandler Database handler
   */
  async getMemberRoles(memberId: string, dbHandler: TrxHandler): Promise<MemberRole[]> {
    return dbHandler
      .query<MemberRole>(
        sql`
        SELECT *
        FROM member_role
        WHERE member_id = ${memberId}
        `,
      )
      .then(({ rows }) => rows.slice(0));
  }

  async isAdmin(memberId: string, dbHandler: TrxHandler): Promise<boolean> {
    return dbHandler
      .query<MemberRole>(
        sql`
        SELECT *
        FROM member_role
        WHERE member_id = ${memberId} and role_id = ${this.adminRoleId}
        `,
      )
      .then(({ rows }) => Boolean(rows[0]));
  }
}
