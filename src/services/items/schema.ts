// TODO: copy paste of item schema
export default {
  $id: 'http://graasp.org/items/',
  definitions: {
    // item properties to be returned to the client
    item: {
      type: 'object',
      properties: {
        id: { $ref: 'http://graasp.org/#/definitions/uuid' },
        name: { type: 'string' },
        description: { type: ['string', 'null'] },
        type: { type: 'string' },
        /**
         * itemPath's 'pattern' not supported in serialization.
         * since 'item' schema is only used for serialization it's safe
         * to just use `{ type: 'string' }`
         */
        // path: { $ref: 'http://graasp.org/#/definitions/itemPath' },
        path: { type: 'string' },
        extra: {
          type: 'object',
          additionalProperties: true,
        },
        creator: { $ref: 'http://graasp.org/#/definitions/uuid' },
        /**
         * for some reason setting these date fields as "type: 'string'"
         * makes the serialization fail using the anyOf. Following the same
         * logic from above, here it's also safe to just remove that specification.
         */
        // createdAt: { type: 'string' },
        // updatedAt: { type: 'string' }
        createdAt: {},
        updatedAt: {},
      },
      additionalProperties: false,
    },

    // item properties that can be modified with user input
    partialItem: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, pattern: '^\\S+( \\S+)*$' },
        type: { type: 'string', minLength: 3, pattern: '^\\S+( \\S+)*$' },
        description: { type: 'string' },
        extra: { type: 'object', additionalProperties: true },
      },
      additionalProperties: false,
    },

    // partialItem requiring one property to be defined
    partialItemRequireOne: {
      allOf: [
        { $ref: '#/definitions/partialItem' },
        {
          anyOf: [{ required: ['name'] }, { required: ['description'] }, { required: ['extra'] }],
        },
      ],
    },
  },
};

export const getAll = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      order: { type: 'string' },
      orderBy: { enum: ['asc', 'desc'] },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'array',
      items: { $ref: 'http://graasp.org/items/#/definitions/item' },
    },
  },
};
