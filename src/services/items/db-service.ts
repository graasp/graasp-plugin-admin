import { DatabaseTransactionConnection as TrxHandler, sql } from 'slonik';

import { Item } from '@graasp/sdk';

import { DEFAULT_PAGE_SIZE } from '../../constants';

// todo: better solution? some copy of core item db
export class AdminItemService {
  pageSize: number;

  // the 'safe' way to dynamically generate the columns names:
  private static allColumns = sql.join(
    [
      'id',
      'name',
      'description',
      'type',
      'path',
      'extra',
      'settings',
      'creator',
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
    ].map((c) =>
      !Array.isArray(c)
        ? sql.identifier([c])
        : sql.join(
            c.map((cwa) => sql.identifier([cwa])),
            sql` AS `,
          ),
    ),
    sql`, `,
  );

  private static allColumnsForJoins = sql.join(
    [
      [['item', 'id'], ['id']],
      [['item', 'name'], ['name']],
      [['item', 'description'], ['description']],
      [['item', 'type'], ['type']],
      [['item', 'path'], ['path']],
      [['item', 'extra'], ['extra']],
      [['item', 'settings'], ['settings']],
      [['item', 'creator'], ['creator']],
      [['item', 'created_at'], ['createdAt']],
      [['item', 'updated_at'], ['updatedAt']],
    ].map((c) =>
      sql.join(
        c.map((cwa) => sql.identifier(cwa)),
        sql` AS `,
      ),
    ),
    sql`, `,
  );

  constructor(pageSize?: number) {
    this.pageSize = pageSize ?? DEFAULT_PAGE_SIZE;
  }

  // todo: implement pagination + filters + order
  /**
   * Get all items
   * @param transactionHandler Database transaction handler
   */
  async getAll(args: { page?: number }, transactionHandler: TrxHandler): Promise<Item[]> {
    const pageNb = args.page ?? 0;
    const skip = pageNb * this.pageSize;
    const limit = this.pageSize;

    return transactionHandler
      .query<Item>(
        sql`
        SELECT ${AdminItemService.allColumns}
        FROM item
        SKIP ${skip}
        LIMIT ${limit}
      `,
      )
      .then(({ rows }) => rows as Item[]);
  }
}
