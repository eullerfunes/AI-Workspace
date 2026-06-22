import { clientRepository } from '../repositories/client.repository';
import { NotFoundError, ConflictError } from '../utils/errors';

export const clientService = {
  async list(tenantId: string, params?: { search?: string; page?: number; limit?: number }) {
    const clients = await clientRepository.findByTenant(tenantId, params);
    const total = await clientRepository.count(tenantId, params?.search);

    return {
      data: clients,
      total,
      page: params?.page || 1,
      limit: params?.limit || 20,
      totalPages: Math.ceil(total / (params?.limit || 20)),
    };
  },

  async getById(id: string, tenantId: string) {
    const client = await clientRepository.findById(id, tenantId);
    if (!client) {
      throw new NotFoundError('Cliente não encontrado');
    }
    return client;
  },

  async create(data: {
    tenantId: string;
    name: string;
    phone: string;
    whatsapp?: string;
    email?: string;
    birthDate?: string;
    cpf?: string;
    notes?: string;
  }) {
    const existing = await clientRepository.findByPhone(data.phone, data.tenantId);
    if (existing) {
      throw new ConflictError('Já existe um cliente com este telefone');
    }

    return clientRepository.create({
      tenant: { connect: { id: data.tenantId } },
      name: data.name,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      cpf: data.cpf,
      notes: data.notes,
    });
  },

  async update(id: string, tenantId: string, data: {
    name?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    birthDate?: string;
    cpf?: string;
    notes?: string;
    isVip?: boolean;
  }) {
    const client = await clientRepository.findById(id, tenantId);
    if (!client) {
      throw new NotFoundError('Cliente não encontrado');
    }

    return clientRepository.update(id, tenantId, {
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
    });
  },

  async delete(id: string, tenantId: string) {
    const client = await clientRepository.findById(id, tenantId);
    if (!client) {
      throw new NotFoundError('Cliente não encontrado');
    }

    await clientRepository.delete(id, tenantId);
  },
};