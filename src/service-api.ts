import { FastifyPluginAsync } from 'fastify';

import { AdminService } from './db-service';
import { isAdmin } from './schemas';
import { TaskManager } from './task-manager';

// Placeholder for options
// export interface GraaspAdminPluginOptions {
// }

const plugin: FastifyPluginAsync = async (fastify) => {
  const {
    taskRunner: runner,
  } = fastify;
  const adminService = new AdminService();
  const taskManager = new TaskManager(adminService);

  // Check if current user is admin ( OR given user ? )
  fastify.get(
    '/admin/current',
    { schema: isAdmin },
    async ({ member, log }) => {
      const task = taskManager.createIsAdminTask(member);
      return runner.runSingle(task, log);
    },
  );
};

export default plugin;
