import { IOrderDetail } from "../../data/interfaces/IOrderDetail";
import { OrderDetailRepository } from "../repositories/OrderDetailRepository";

export class OrderDetailUseCase {
  constructor(private orderDetailRepository: OrderDetailRepository) {}

  async createOrderDetail(orderDetailData: IOrderDetail): Promise<IOrderDetail> {
    try {
      const newOrderDetail = await this.orderDetailRepository.add(orderDetailData);
      return newOrderDetail;
    } catch (error: any) {
      throw new Error("Error creating order detail: " + error.message);
    }
  }

  async getAllOrderDetails(): Promise<IOrderDetail[]> {
    try {
      const orderDetails = await this.orderDetailRepository.getAll();
      return orderDetails;
    } catch (error: any) {
      throw new Error("Error getting all order details: " + error.message);
    }
  }

  async getOrderDetailById(orderDetailId: string): Promise<IOrderDetail | null> {
    try {
      const orderDetail = await this.orderDetailRepository.getById(orderDetailId);
      return orderDetail;
    } catch (error: any) {
      throw new Error("Error getting order detail by ID: " + error.message);
    }
  }

  async getOrderDetailsForOrder(orderId: string): Promise<any[]> {
    try {
        const orderDetails = await this.orderDetailRepository.getOrderDetailsForOrder(orderId);
        return orderDetails;
    } catch (error: any) {
        throw new Error("Error getting order detail for order: " + error.message);
    }
  }

  async updateOrderDetail(orderDetailId: string, updatedOrderDetailData: Partial<IOrderDetail>): Promise<IOrderDetail | null> {
    try {
      const updatedOrderDetail = await this.orderDetailRepository.update(orderDetailId, updatedOrderDetailData);
      return updatedOrderDetail;
    } catch (error: any) {
      throw new Error("Error updating order detail: " + error.message);
    }
  }

  async deleteOrderDetail(orderDetailId: string): Promise<boolean> {
    try {
      const result = await this.orderDetailRepository.delete(orderDetailId);
      return result;
    } catch (error: any) {
      throw new Error("Error deleting order detail: " + error.message);
    }
  }
}