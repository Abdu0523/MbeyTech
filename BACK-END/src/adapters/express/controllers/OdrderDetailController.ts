import { Request, Response } from "express";
import { IOrderDetail } from "../../../data/interfaces/IOrderDetail";
import { OrderDetailUseCase } from "./../../../infrastructure/use-cases/OrderDetailUseCase";

export class OrderDetailController {
  constructor(private orderDetailUseCase: OrderDetailUseCase) {}

  async createOrderDetail(req: Request, res: Response): Promise<void> {
    try {
      const orderDetailData: IOrderDetail = req.body;
      const newOrderDetail = await this.orderDetailUseCase.createOrderDetail(orderDetailData);
      res.status(201).json(newOrderDetail);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllOrderDetails(req: Request, res: Response): Promise<void> {
    try {
      const orderDetails = await this.orderDetailUseCase.getAllOrderDetails();
      res.status(200).json(orderDetails);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderDetailById(req: Request, res: Response): Promise<void> {
    try {
      const orderDetailId: string = req.params.id;
      const orderDetail = await this.orderDetailUseCase.getOrderDetailById(orderDetailId);
      if (!orderDetail) {
        res.status(404).json({ message: "Order detail not found" });
      } else {
        res.status(200).json(orderDetail);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderDetailsForOrder(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId;

    try {
      const orderDetails = await this.orderDetailUseCase.getOrderDetailsForOrder(orderId);
      res.status(200).json(orderDetails);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrderDetail(req: Request, res: Response): Promise<void> {
    try {
      const orderDetailId: string = req.params.id;
      const updatedOrderDetailData: Partial<IOrderDetail> = req.body;
      const updatedOrderDetail = await this.orderDetailUseCase.updateOrderDetail(orderDetailId, updatedOrderDetailData);
      if (!updatedOrderDetail) {
        res.status(404).json({ message: "Order detail not found" });
      } else {
        res.status(200).json(updatedOrderDetail);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteOrderDetail(req: Request, res: Response): Promise<void> {
    try {
      const orderDetailId: string = req.params.id;
      const result = await this.orderDetailUseCase.deleteOrderDetail(orderDetailId);
      if (!result) {
        res.status(404).json({ message: "Order detail not found" });
      } else {
        res.status(204).end();
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}