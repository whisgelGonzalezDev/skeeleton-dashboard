import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppRole } from '../common/decorators/roles.decorator'

interface DemoAccount {
  id: string
  email: string
  password: string
  role: AppRole
  permissions: string[]
  tenantId: string
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'usr_admin',
    email: 'admin@skeeleton.dev',
    password: 'skeeleton2026',
    role: 'SuperAdmin',
    permissions: ['all'],
    tenantId: 'demo-tenant',
  },
  {
    id: 'usr_viewer',
    email: 'analyst@skeeleton.dev',
    password: 'readOnly2026',
    role: 'Viewer',
    permissions: ['read:dashboard', 'read:reports'],
    tenantId: 'demo-tenant',
  },
]

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
    )
    if (!account) throw new UnauthorizedException('Invalid credentials')

    const payload = {
      sub: account.id,
      email: account.email,
      role: account.role,
      permissions: account.permissions,
      tenantId: account.tenantId,
    }
    const token = await this.jwt.signAsync(payload)
    return {
      token,
      user: {
        id: account.id,
        email: account.email,
        role: account.role,
        permissions: account.permissions,
      },
    }
  }
}
