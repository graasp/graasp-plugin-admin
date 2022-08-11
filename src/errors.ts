import { StatusCodes } from 'http-status-codes';

import { ErrorFactory } from '@graasp/sdk';

import { PLUGIN_NAME } from './constants';

const AdminError = ErrorFactory(PLUGIN_NAME);

export class MemberNotAdmin extends AdminError {
  constructor(data?: unknown) {
    super(
      {
        code: 'GERRA001',
        statusCode: StatusCodes.FORBIDDEN,
        message: 'MEMBER_NOT_ADMIN',
      },
      data,
    );
  }
}
