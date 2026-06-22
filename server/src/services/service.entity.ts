import { serviceRepository } from '../repositories/service.repository';
import { NotFoundError } from '../utils/errors';

export const serviceEntityService = {
  async list(tenantId: string, category?: string) {
    return serviceRepository.findByTenant(tenantId, category);
  },

  async getById(id: string, tenantId: string) {
    const service = await serviceRepository.findById(id, tenantId);
    if (!service) throw new NotFoundError('Serviço não encontrado');
    return service;
  },

  async create(data: {
    tenantId: string;
    name: string;
    description?: string;
    price: number;
    duration: number;
    color?: string;
    category?: string;
    commissionPercent?: number;
  }) {
    return serviceRepository.create({
      tenant: { connect: { id: data.tenantId } },
      name: data.name,
      description: data.description,
      price: data.price,
      duration: data.duration,
      color: data.color || '#6C63FF',
      category: data.category,
      commissionPercent: data.commissionPercent || 40,
    });
  },

  async update(id: string, tenantId: string, data: any) {
    const service = await serviceRepository.findById(id, tenantId);
    if (!service) throw new NotFoundError('Serviço não encontrado');
    return serviceRepository.update(id, tenantId, data);
  },

  async delete(id: string, tenantId: string) {
    const service = await serviceRepository.findById(id, tenantId);
    if (!service) throw new NotFoundError('Serviço não encontrado');
    await serviceRepository.delete(id, tenantId);
  },
};