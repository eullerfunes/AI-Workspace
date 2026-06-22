import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

export const appointmentRepository = {
  findById: (id: string, tenantId: string) =>
    prisma.appointment.findFirst({
      where: { id, tenantId },
      include: {
        client: { select: { id: true, name: true, phone: true, photoUrl: true } },
        barber: { select: { id: true, name: true, color: true } },
        services: { include: { service: true } },
        ratings: true,
      },
    }),

  findByTenant: (tenantId: string, params: {
    date?: string;
    barberId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const { date, barberId, status, startDate, endDate, page = 1, limit = 50 } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.AppointmentWhereInput = { tenantId };

    if (date) where.date = new Date(date);
    if (barberId) where.barberId = barberId;
    if (status) where.status = status as any;
    if (startDate || endDate) {
      where.date = {
        ...(startDate ? { gte: new Date(startDate) } : {}),
        ...(endDate ? { lte: new Date(endDate) } : {}),
      };
    }

    return prisma.appointment.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      include: {
        client: { select: { id: true, name: true, phone: true } },
        barber: { select: { id: true, name: true, color: true } },
        services: true,
      },
    });
  },

  count: (tenantId: string, params: { date?: string; barberId?: string; status?: string }) =>
    prisma.appointment.count({
      where: { tenantId, ...(params.date ? { date: new Date(params.date) } : {}), ...(params.barberId ? { barberId: params.barberId } : {}), ...(params.status ? { status: params.status as any } : {}) },
    }),

  create: (data: Prisma.AppointmentCreateInput) =>
    prisma.appointment.create({ data }),

  update: (id: string, tenantId: string, data: Prisma.AppointmentUpdateInput) =>
    prisma.appointment.update({ where: { id }, data }),

  delete: (id: string, tenantId: string) =>
    prisma.appointment.deleteMany({ where: { id, tenantId } }),

  findConflicts: (tenantId: string, barberId: string, date: Date, startTime: string, endTime: string, excludeId?: string) =>
    prisma.appointment.findMany({
      where: {
        tenantId,
        barberId,
        date,
        status: { notIn: ['CANCELLED', 'NO_SHOW'] },
        id: excludeId ? { not: excludeId } : undefined,
        OR: [
          { startTime: { lte: startTime }, endTime: { gt: startTime } },
          { startTime: { lt: endTime }, endTime: { gte: endTime } },
          { startTime: { gte: startTime }, endTime: { lte: endTime } },
        ],
      },
    }),
};