import { barberRepository } from '../repositories/barber.repository';
import { NotFoundError } from '../utils/errors';

export const barberService = {
  async list(tenantId: string) {
    return barberRepository.findByTenant(tenantId);
  },

  async getById(id: string, tenantId: string) {
    const barber = await barberRepository.findById(id, tenantId);
    if (!barber) throw new NotFoundError('Barbeiro não encontrado');
    return barber;
  },

  async create(data: {
    tenantId: string;
    name: string;
    specialties?: string[];
    phone?: string;
    email?: string;
    workingDays?: number[];
    startTime?: string;
    endTime?: string;
    commissionPercent?: number;
    color?: string;
  }) {
    return barberRepository.create({
      tenant: { connect: { id: data.tenantId } },
      name: data.name,
      specialties: data.specialties || [],
      phone: data.phone,
      email: data.email,
      workingDays: data.workingDays || [1, 2, 3, 4, 5, 6],
      startTime: data.startTime || '08:00',
      endTime: data.endTime || '18:00',
      commissionPercent: data.commissionPercent || 40,
      color: data.color || '#6C63FF',
    });
  },

  async update(id: string, tenantId: string, data: any) {
    const barber = await barberRepository.findById(id, tenantId);
    if (!barber) throw new NotFoundError('Barbeiro não encontrado');
    return barberRepository.update(id, tenantId, data);
  },

  async delete(id: string, tenantId: string) {
    const barber = await barberRepository.findById(id, tenantId);
    if (!barber) throw new NotFoundError('Barbeiro não encontrado');
    await barberRepository.delete(id, tenantId);
  },

  async findAvailable(tenantId: string, date: string, startTime: string, endTime: string) {
    return barberRepository.findAvailable(tenantId, date, startTime, endTime);
  },
};