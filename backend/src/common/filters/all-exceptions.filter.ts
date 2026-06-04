import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ZodError } from 'zod'

export interface ApiErrorBody {
  ok: false
  statusCode: number
  error: string
  message: string
  details?: unknown
  path: string
  timestamp: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let error = 'InternalServerError'
    let message = 'Unexpected error'
    let details: unknown

    if (exception instanceof ZodError) {
      status = HttpStatus.BAD_REQUEST
      error = 'ValidationError'
      message = 'Invalid request payload'
      details = exception.flatten()
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const resp = exception.getResponse()
      error = exception.name
      if (typeof resp === 'string') {
        message = resp
      } else if (typeof resp === 'object' && resp) {
        const r = resp as Record<string, unknown>
        message = (r.message as string) ?? exception.message
        details = r.details
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    const body: ApiErrorBody = {
      ok: false,
      statusCode: status,
      error,
      message,
      details,
      path: req.url,
      timestamp: new Date().toISOString(),
    }

    if (status >= 500) {
      this.logger.error(`[${req.method}] ${req.url} → ${status}`, (exception as Error)?.stack)
    } else {
      this.logger.warn(`[${req.method}] ${req.url} → ${status} ${message}`)
    }

    res.status(status).json(body)
  }
}
