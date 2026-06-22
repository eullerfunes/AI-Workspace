import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const barberRepository = {
  findById: (id: string, tenantId: string) =>
    prisma.barber.findFirst({
      where: { id, tenantId },
      include: {
        _count: { select: { appointments: true } },
      },
    }),

  findByTenant: (tenantId: string) =>
    prisma.barber.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { appointments: true } },
      },
    }),

  create: (data: Prisma.BarberCreateInput) =>
    prisma.barber.create({ data }),

  update: (id: string, tenantId: string, data: Prisma.BarberUpdateInput) =>
    prisma.barber.update({
      where: { id },
      data,
    }),

  delete: (id: string, tenantId: string) =>
    prisma.barber.deleteMany({
      where: { id, tenantId },
    }),

  findAvailable: (tenantId: string, date: string, startTime: string, endTime: string) =>
    prisma.barber.findMany({
      where: {
        tenantId,
        isActive: true,
        appointments: {
          none: {
            date: new Date(date),
            status: { notIn: ['CANCELLED', 'NO_SHOW'] },
            OR: [
              { startTime: { lte: startTime }, endTime: { gt: startTime } },
              { startTime: { lt: endTime }, endTime: { gte: endTime } },
              { startTime: { gte: startTime }, endTime: { lte: endTime } },
            ],
          },
        },
      },
      orderBy: { name: 'asc' },
    }),
};