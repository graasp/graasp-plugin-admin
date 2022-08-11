export default {
  $id: 'http://graasp.org/admin/',
  definitions: {
    role: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: { $ref: 'http://graasp.org/#/definitions/uuid' },
        name: { type: 'string' },
      },
    },
    memberRole: {
      type: 'object',
      required: ['id', 'memberId', 'roleId'],
      properties: {
        id: { $ref: 'http://graasp.org/#/definitions/uuid' },
        memberId: { $ref: 'http://graasp.org/#/definitions/uuid' },
        roleId: { $ref: 'http://graasp.org/#/definitions/uuid' },
      },
    },
  },
};

export const getMemberRole = {
  response: {
    200: {
      type: 'array',
      items: { $ref: 'http://graasp.org/admin/#/definitions/memberRole' },
    },
  },
};
