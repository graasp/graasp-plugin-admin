import { StatusCodes } from 'http-status-codes';

import build from './app';

// const runner = new

// const MOCK_ITEMS = [{
//   id: 'item-id'
// }]

describe('Item Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('GET /items/all with default pagination', async () => {
    // jest.spyOn(runner, 'runSingleSequence').mockImplementation(() => {
    //   MOCK_ITEMS
    // })

    const app = await build();
    const response = await app.inject({
      method: 'GET',
      url: '/items/all',
    });

    expect(response.statusCode).toEqual(StatusCodes.OK);
  });
});
