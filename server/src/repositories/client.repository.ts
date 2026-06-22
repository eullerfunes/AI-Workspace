import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const clientRepository = {
  findById: (id: string, tenantId: string) =>
    prisma.client.findFirst({
      where: { id, tenantId },
      include: {
        appointments: {
          orderBy: { date: 'desc' },
          take: 10,
          include: {
            services: true,
            barber: { select: { name: true } },
          },
        },
      },
    }),

  findByTenant: (tenantId: string, params?: { search?: string; page?: number; limit?: number }) => {
    const { search, page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = { tenantId };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    return prisma.client.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { appointments: true } },
      },
    });
  },

  count: (tenantId: string, search?: string) => {
    const where: Prisma.ClientWhereInput = { tenantId };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    return prisma.client.count({ where });
  },

  create: (data: Prisma.ClientCreateInput) =>
    prisma.client.create({ data }),

  update: (id: string, tenantId: string, data: Prisma.ClientUpdateInput) =>
    prisma.client.update({
      where: { id },
      data,
    }),

  delete: (id: string, tenantId: string) =>
    prisma.client.deleteMany({
      where: { id, tenantId },
    }),

  findByPhone: (phone: string, tenantId: string) =>
    prisma.client.findUnique({
      where: { tenantId_phone: { tenantId, phone } },
    }),
};