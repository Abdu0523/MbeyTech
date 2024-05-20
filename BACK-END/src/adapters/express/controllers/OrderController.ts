import { Request, Response } from "express";
import { IOrder } from "./../../../data/interfaces/IOrder";
import { OrderUseCase } from "./../../../infrastructure/use-cases/OrderUseCase";

export class OrderController {
  constructor(private orderUseCase: OrderUseCase) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData: IOrder = req.body;
      const newOrder = await this.orderUseCase.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderUseCase.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderId: string = req.params.id;
      const order = await this.orderUseCase.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json(order);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderForCustomer(req: Request, res: Response): Promise<void> {
    const customerId = req.params.customerId;

    try {
      const order = await this.orderUseCase.getOrderForCustomer(customerId);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: 'Order not found for customer.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUnvalidatedOrdersForCustomer(req: Request, res: Response): Promise<void> {
    const customerId = req.params.customerId;

    try {
      const orders = await this.orderUseCase.getUnvalidatedOrdersForCustomer(customerId);
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId: string = req.params.id;
      const updatedOrderData: Partial<IOrder> = req.body;
      const updatedOrder = await this.orderUseCase.updateOrder(orderId, updatedOrderData);
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json(updatedOrder);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId: string = req.params.id;
      const result = await this.orderUseCase.deleteOrder(orderId);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(204).end();
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
