import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NO_JWT_KEY } from '../decorators/no-jwt-route.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const noJwt = this.reflector.getAllAndOverride<boolean>(NO_JWT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noJwt) {
      return true;
    }
    return super.canActivate(context);
  }
}
