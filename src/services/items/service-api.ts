import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import '@graasp/sdk';

import { AdminItemService } from './db-service';
import itemSchema, { getAll } from './schema';
import { AdminItemTaskManager } from './task-manager';

const plugin: FastifyPluginAsync = async (fastify) => {
  const { taskRunner: runner, admin } = fastify;

  if (!admin) {
    // TODO
    throw new Error();
  }

  fastify.addSchema(itemSchema);

  const { taskManager: adminTaskManager, adminRoleId } = admin;

  const adminItemService = new AdminItemService();
  const adminItemTaskManager = new AdminItemTaskManager(
    adminTaskManager,
    adminItemService,
    adminRoleId,
  );

  // Get the member roles of current user
  fastify.get('/all', { schema: getAll }, async ({ member, log }) => {
    const tasks = adminItemTaskManager.createGetAllTaskSequence(member);
    return runner.runSingleSequence(tasks, log);
  });
};

export default fp(plugin, {
  fastify: '3.x',
  name: 'graasp-plugin-admin-items',
});
