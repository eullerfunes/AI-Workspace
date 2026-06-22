import { Request, Response, NextFunction } from 'express';
import { serviceEntityService } from '../services/service.entity';

export const serviceController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query;
      const services = await serviceEntityService.list(req.user!.tenantId, category as string);
      res.json({ status: 'success', data: services });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceEntityService.getById(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', data: service });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceEntityService.create({ ...req.body, tenantId: req.user!.tenantId });
      res.status(201).json({ status: 'success', data: service });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceEntityService.update(req.params.id, req.user!.tenantId, req.body);
      res.json({ status: 'success', data: service });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await serviceEntityService.delete(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', message: 'Serviço removido com sucesso' });
    } catch (error) {
      next(error);
    }
  },
};