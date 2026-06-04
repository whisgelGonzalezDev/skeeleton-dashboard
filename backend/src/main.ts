import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get(ConfigService)

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN', 'http://localhost:5173'),
    credentials: true,
  })
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionsFilter())

  const port = config.get<number>('PORT', 4000)
  await app.listen(port)

  console.log(`[skeeleton-backend] listening on http://localhost:${port}/api`)
}

bootstrap()
