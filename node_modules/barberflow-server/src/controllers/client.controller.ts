import { Request, Response, NextFunction } from 'express';
import { clientService } from '../services/client.service';

export const clientController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, page, limit } = req.query;
      const result = await clientService.list(req.user!.tenantId, {
        search: search as string,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      });
      res.json({ status: 'success', ...result });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.getById(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', data: client });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.create({
        ...req.body,
        tenantId: req.user!.tenantId,
      });
      res.status(201).json({ status: 'success', data: client });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.update(req.params.id, req.user!.tenantId, req.body);
      res.json({ status: 'success', data: client });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await clientService.delete(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', message: 'Cliente removido com sucesso' });
    } catch (error) {
      next(error);
    }
  },
};