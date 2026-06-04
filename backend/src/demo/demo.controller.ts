import { Controller, Get, Param, Query } from '@nestjs/common'
import { DemoService } from './demo.service'
import { Roles } from '../common/decorators/roles.decorator'

/**
 * All routes require a valid JWT (enforced globally by JwtAuthGuard).
 * `@Roles()` narrows further: write-style endpoints (alerts) demand SuperAdmin;
 * read endpoints accept SuperAdmin or Viewer.
 */
@Controller('demo')
export class DemoController {
  constructor(private readonly demo: DemoService) {}

  @Get('kpis')
  @Roles('SuperAdmin', 'Viewer')
  kpis() {
    return this.demo.getKpis()
  }

  @Get('users')
  @Roles('SuperAdmin', 'Viewer')
  users(@Query('status') status?: string, @Query('plan') plan?: string) {
    return this.demo.getUsers({ status, plan })
  }

  @Get('users/:id')
  @Roles('SuperAdmin', 'Viewer')
  user(@Param('id') id: string) {
    return this.demo.getUserById(id)
  }

  @Get('activity')
  @Roles('SuperAdmin', 'Viewer')
  activity() {
    return this.demo.getActivityLogs()
  }

  @Get('charts')
  @Roles('SuperAdmin', 'Viewer')
  charts() {
    return this.demo.getCharts()
  }

  @Get('alerts')
  @Roles('SuperAdmin')
  alerts() {
    return this.demo.getAlerts()
  }
}
