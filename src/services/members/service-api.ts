import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import '@graasp/sdk';

import { AdminMemberService } from './db-service';
import memberSchema, { getAll } from './schema';
import { AdminMemberTaskManager } from './task-manager';

const plugin: FastifyPluginAsync = async (fastify) => {
  const { taskRunner: runner, admin } = fastify;

  if (!admin) {
    // TODO
    throw new Error();
  }

  fastify.addSchema(memberSchema);

  const { taskManager: adminTaskManager, adminRoleId } = admin;

  const adminMemberService = new AdminMemberService();
  const adminMemberTaskManager = new AdminMemberTaskManager(
    adminTaskManager,
    adminMemberService,
    adminRoleId,
  );

  // Get the member roles of current user
  fastify.get('/all', { schema: getAll }, async ({ member, log }) => {
    const tasks = adminMemberTaskManager.createGetAllTaskSequence(member);
    return runner.runSingleSequence(tasks, log);
  });
};

export default fp(plugin, {
  fastify: '3.x',
  name: 'graasp-plugin-admin-members',
});
