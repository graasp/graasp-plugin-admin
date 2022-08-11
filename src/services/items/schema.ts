export const getAll = {
  response: {
    200: {
      type: 'array',
      items: { $ref: 'http://graasp.org/items/#/definitions/item' },
    },
  },
};
