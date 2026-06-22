import { Request, Response, NextFunction } from 'express';
import { barberService } from '../services/barber.service';

export const barberController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const barbers = await barberService.list(req.user!.tenantId);
      res.json({ status: 'success', data: barbers });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await barberService.getById(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', data: barber });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await barberService.create({ ...req.body, tenantId: req.user!.tenantId });
      res.status(201).json({ status: 'success', data: barber });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await barberService.update(req.params.id, req.user!.tenantId, req.body);
      res.json({ status: 'success', data: barber });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await barberService.delete(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', message: 'Barbeiro removido com sucesso' });
    } catch (error) {
      next(error);
    }
  },
};