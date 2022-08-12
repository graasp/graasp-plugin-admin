import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import '@graasp/sdk';

import { QueryFilters } from '../../constants';
import { AdminItemService } from './db-service';
import itemSchema, { getAll } from './schema';
import { AdminItemTaskManager } from './task-manager';

const plugin: FastifyPluginAsync<{ pageSize?: number }> = async (fastify, options) => {
  const { taskRunner: runner, admin } = fastify;
  const { pageSize } = options;

  if (!admin) {
    // TODO
    throw new Error();
  }

  fastify.addSchema(itemSchema);

  const { taskManager: adminTaskManager, adminRoleId } = admin;

  const adminItemService = new AdminItemService(pageSize);
  const adminItemTaskManager = new AdminItemTaskManager(
    adminTaskManager,
    adminItemService,
    adminRoleId,
  );

  // Get the member roles of current user
  fastify.get<{ Querystring: QueryFilters }>(
    '/all',
    { schema: getAll },
    async ({ member, log, query }) => {
      const filters = { page: query.page, order: query.order, orderBy: query.orderBy };
      const tasks = adminItemTaskManager.createGetAllTaskSequence(member, filters);
      return runner.runSingleSequence(tasks, log);
    },
  );
};

export default fp(plugin, {
  fastify: '3.x',
  name: 'graasp-plugin-admin-items',
});
