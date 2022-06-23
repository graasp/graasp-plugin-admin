// global
import { sql, DatabaseTransactionConnection as TrxHandler } from 'slonik';
import { MemberRole } from './types';

/**
 * Database's first layer of abstraction for Admin DB services
 */
export class AdminService {

  // QUESTION: Can a member have multiple roles? Do we expect to have more roles besides admin and normal user? 
  // We might want to return a MemberRole[] here
  /**
   * Get the role of given user
   * @param memberId 
   * @param dbHandler Database handler
   */
  async getMemberRole(memberId: string, dbHandler: TrxHandler): Promise<MemberRole> {
    return dbHandler
      .query<MemberRole>(
        sql`
        SELECT *
        FROM member_role
        WHERE member_id = ${memberId}
        `,
      )
      .then(({ rows }) => rows[0]);
  }
}
