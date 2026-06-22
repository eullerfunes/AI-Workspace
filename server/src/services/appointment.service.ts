import { appointmentRepository } from '../repositories/appointment.repository';
import { NotFoundError, ConflictError } from '../utils/errors';

export const appointmentService = {
  async list(tenantId: string, params: {
    date?: string;
    barberId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const appointments = await appointmentRepository.findByTenant(tenantId, params);
    const total = await appointmentRepository.count(tenantId, params);
    return {
      data: appointments,
      total,
      page: params.page || 1,
      limit: params.limit || 50,
      totalPages: Math.ceil(total / (params.limit || 50)),
    };
  },

  async getById(id: string, tenantId: string) {
    const appointment = await appointmentRepository.findById(id, tenantId);
    if (!appointment) throw new NotFoundError('Agendamento não encontrado');
    return appointment;
  },

  async create(data: {
    tenantId: string;
    clientId: string;
    barberId: string;
    date: string;
    startTime: string;
    endTime: string;
    services: Array<{ serviceId: string; serviceName: string; servicePrice: number; serviceDuration: number }>;
    notes?: string;
    isOnlineBooking?: boolean;
    source?: string;
    createdBy?: string;
  }) {
    const conflicts = await appointmentRepository.findConflicts(
      data.tenantId,
      data.barberId,
      new Date(data.date),
      data.startTime,
      data.endTime
    );

    if (conflicts.length > 0) {
      throw new ConflictError('Já existe um agendamento neste horário');
    }

    const totalValue = data.services.reduce((sum, s) => sum + s.servicePrice, 0);

    const createData: any = {
      tenant: { connect: { id: data.tenantId } },
      client: { connect: { id: data.clientId } },
      barber: { connect: { id: data.barberId } },
      date: new Date(data.date),
      startTime: data.startTime,
      endTime: data.endTime,
      totalValue,
      notes: data.notes,
      isOnlineBooking: data.isOnlineBooking || false,
      source: data.source,
      services: {
        create: data.services,
      },
    };

    if (data.createdBy) {
      createData.createdByUser = { connect: { id: data.createdBy } };
    }

    return appointmentRepository.create(createData);
  },

  async update(id: string, tenantId: string, data: any) {
    const appointment = await appointmentRepository.findById(id, tenantId);
    if (!appointment) throw new NotFoundError('Agendamento não encontrado');

    if (data.barberId || data.date || data.startTime || data.endTime) {
      const conflicts = await appointmentRepository.findConflicts(
        tenantId,
        data.barberId || appointment.barberId,
        new Date(data.date || appointment.date),
        data.startTime || appointment.startTime,
        data.endTime || appointment.endTime,
        id
      );
      if (conflicts.length > 0) {
        throw new ConflictError('Já existe um agendamento neste horário');
      }
    }

    return appointmentRepository.update(id, tenantId, data);
  },

  async updateStatus(id: string, tenantId: string, status: string) {
    const appointment = await appointmentRepository.findById(id, tenantId);
    if (!appointment) throw new NotFoundError('Agendamento não encontrado');
    return appointmentRepository.update(id, tenantId, { status: status as any });
  },

  async delete(id: string, tenantId: string) {
    const appointment = await appointmentRepository.findById(id, tenantId);
    if (!appointment) throw new NotFoundError('Agendamento não encontrado');
    await appointmentRepository.delete(id, tenantId);
  },
};