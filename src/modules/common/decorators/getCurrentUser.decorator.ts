import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadRefresh } from '../../auth/types/jwt';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadRefresh | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request.user;

    if (!request.user) {
      return null;
    }
    return request.user[data];
  },
);
