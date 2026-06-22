import { Request, Response, NextFunction } from 'express';
import { appointmentService } from '../services/appointment.service';

export const appointmentController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, barberId, status, startDate, endDate, page, limit } = req.query;
      const result = await appointmentService.list(req.user!.tenantId, {
        date: date as string,
        barberId: barberId as string,
        status: status as string,
        startDate: startDate as string,
        endDate: endDate as string,
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
      const appointment = await appointmentService.getById(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', data: appointment });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await appointmentService.create({
        ...req.body,
        tenantId: req.user!.tenantId,
        createdBy: req.user!.userId,
      });
      res.status(201).json({ status: 'success', data: appointment });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await appointmentService.update(req.params.id, req.user!.tenantId, req.body);
      res.json({ status: 'success', data: appointment });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const appointment = await appointmentService.updateStatus(
        req.params.id,
        req.user!.tenantId,
        req.body.status
      );
      res.json({ status: 'success', data: appointment });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await appointmentService.delete(req.params.id, req.user!.tenantId);
      res.json({ status: 'success', message: 'Agendamento removido com sucesso' });
    } catch (error) {
      next(error);
    }
  },
};