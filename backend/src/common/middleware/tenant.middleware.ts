import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

const DEFAULT_TENANT = 'demo-tenant'

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const header = (req.headers['x-tenant-id'] as string | undefined)?.trim()
    req.tenantId = header && header.length > 0 ? header : DEFAULT_TENANT
    next()
  }
}
