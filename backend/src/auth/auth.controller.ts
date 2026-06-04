import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { AuthService } from './auth.service'
import { Public } from '../common/decorators/public.decorator'
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export type LoginDto = z.infer<typeof LoginSchema>

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(LoginSchema))
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password)
  }
}
