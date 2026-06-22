import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const serviceRepository = {
  findById: (id: string, tenantId: string) =>
    prisma.service.findFirst({ where: { id, tenantId } }),

  findByTenant: (tenantId: string, category?: string) =>
    prisma.service.findMany({
      where: { tenantId, ...(category ? { category } : {}) },
      orderBy: { name: 'asc' },
    }),

  create: (data: Prisma.ServiceCreateInput) =>
    prisma.service.create({ data }),

  update: (id: string, tenantId: string, data: Prisma.ServiceUpdateInput) =>
    prisma.service.update({ where: { id }, data }),

  delete: (id: string, tenantId: string) =>
    prisma.service.deleteMany({ where: { id, tenantId } }),
};