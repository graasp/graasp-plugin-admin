import { FastifyPluginAsync } from 'fastify';

import { AdminService } from './db-service';
import schemas, { getMemberRole } from './schemas';
import { TaskManager } from './task-manager';
export interface GraaspAdminPluginOptions {
  adminRoleId: string,
}

const plugin: FastifyPluginAsync<GraaspAdminPluginOptions> = async (fastify, options) => {
  const {
    taskRunner: runner,
  } = fastify;
  const { adminRoleId } = options;
  const adminService = new AdminService(adminRoleId);
  const taskManager = new TaskManager(adminService);

  fastify.addSchema(schemas);

  // Get the member roles of current user
  fastify.get(
    '/member-role/current',
    { schema: getMemberRole },
    async ({ member, log }) => {
      const task = taskManager.createIsAdminTask(member);
      return runner.runSingle(task, log);
    },
  );
};

export default plugin;
