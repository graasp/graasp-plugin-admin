import fastify from 'fastify';

import adminPlugin from '../src/service-api';
import itemPlugin from '../src/services/items/service-api';
import memberPlugin from '../src/services/members/service-api';
import common, { memberSchema } from './globalSchema';

const build = async (opts = {}) => {
  // const app = fastify({
  //   logger: {
  //     prettyPrint: true,
  //     level: 'debug',
  //   },
  //   ajv: {
  //     customOptions: {
  //       coerceTypes: 'array',
  //     },
  //   },
  // });
  const app = fastify({
    logger: false,
    ajv: {
      customOptions: {
        coerceTypes: 'array',
      },
    },
  });

  app.addSchema(common);
  app.addSchema(memberSchema);

  await app.register(adminPlugin);

  app.register(
    async (fastify) => {
      await fastify.register(itemPlugin);
    },
    { prefix: '/items' },
  );

  app.register(
    async (fastify) => {
      await fastify.register(memberPlugin);
    },
    { prefix: '/members' },
  );

  return app;
};

export default build;
