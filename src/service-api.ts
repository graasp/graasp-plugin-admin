import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { AdminService } from './db-service';
import { MemberNotAdmin } from './errors';
import schemas, { getMemberRole } from './schemas';
import { AdminTaskManager } from './task-manager';

export interface GraaspAdminPluginOptions {
  adminRoleId: string;
}

const plugin: FastifyPluginAsync<GraaspAdminPluginOptions> = async (fastify, options) => {
  const { taskRunner: runner, db } = fastify;
  const { adminRoleId } = options;
  const adminService = new AdminService(adminRoleId);
  const taskManager = new AdminTaskManager(adminService);

  const verifyIsAdmin = async (request: FastifyRequest) => {
    if (!request.member) {
      throw new MemberNotAdmin(request?.member);
    }

    const isAdmin = await adminService.isAdmin(request.member.id, db.pool);
    return isAdmin;
  };

  fastify.decorate('admin', {
    adminRoleId,
    taskManager,
    dbService: adminService,
    verifyIsAdmin,
  });

  fastify.addSchema(schemas);

  // Get the member roles of current user
  fastify.get('/member-role/current', { schema: getMemberRole }, async ({ member, log }) => {
    const task = taskManager.createGetMemberRolesTask(member);
    return runner.runSingle(task, log);
  });
};

export default fp(plugin, {
  fastify: '3.x',
  name: 'graasp-plugin-admin',
});
