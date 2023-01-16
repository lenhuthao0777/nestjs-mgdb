import { BadRequestException } from '@nestjs/common';

export const HandleResponse = (code?: number, message?: string, data?: any) => {
  switch (code) {
    case 200:
      return {
        status: 'Ok',
        code,
        data,
        message,
      };

    case 201:
      return {
        status: 'Success',
        code,
        data,
        message,
      };

    case 401:
      throw new BadRequestException(message);

    case 400:
      throw new BadRequestException(message);

    default:
      break;
  }
};
