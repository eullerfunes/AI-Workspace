import { prisma } from '../config/database';

export const authRepository = {
  findUserByEmail: (tenantId: string, email: string) =>
    prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
      include: { tenant: true },
    }),

  findUserById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      include: { tenant: true },
    }),

  createTenant: (data: {
    name: string;
    slug: string;
  }) =>
    prisma.tenant.create({ data }),

  createUser: (data: {
    tenantId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'ADMIN' | 'MANAGER' | 'BARBER' | 'RECEPTIONIST' | 'CLIENT';
  }) =>
    prisma.user.create({ data }),

  updateRefreshToken: (userId: string, refreshToken: string | null) =>
    prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    }),

  updateLastLogin: (userId: string) =>
    prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    }),

  findTenantBySlug: (slug: string) =>
    prisma.tenant.findUnique({ where: { slug } }),
};