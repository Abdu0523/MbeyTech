import IRepository from "./IRepository";
import { IOrder } from "../../data/interfaces/IOrder";
import OrderModel from "../../data/models/Order.entity";

export class OrderRepository implements IRepository<any> {
  getByName(name: string): Promise<any> {
      throw new Error("Method not implemented.");
  }

  async add(entity: IOrder): Promise<IOrder> {
    try {
      const newOrder = await OrderModel.create(entity);
      return newOrder;
    } catch (error: any) {
      throw new Error("Error adding order: " + error.message);
    }
  }

  async getAll(): Promise<IOrder[]> {
    try {
      const orders = await OrderModel.find();
      return orders;
    } catch (error: any) {
      throw new Error("Error getting all orders: " + error.message);
    }
  }

  async getById(id: string): Promise<IOrder | null> {
    try {
      const order = await OrderModel.findById(id);
      return order;
    } catch (error: any) {
      throw new Error("Error getting order by ID: " + error.message);
    }
  }

  async getOrderForCustomer(customerId: string): Promise<any> {
    try {
      const order = await OrderModel.findOne({ customerId });
      return order;
    } catch (error: any) {
      throw new Error("Error getting order for customer: " + error.message);
    }
  }

  async getUnvalidatedOrdersForCustomer(customerId: string): Promise<any> {
    try {
      const orders = await OrderModel.findOne({ customerId, validated: false });
      return orders;
    } catch (error: any) {
      throw new Error("Error getting unvalidated orders for customer: " + error.message);
    }
  }

  async update(
    id: string,
    entity: Partial<IOrder>
  ): Promise<IOrder | null> {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        id,
        entity,
        { new: true }
      );
      return updatedOrder;
    } catch (error: any) {
      throw new Error("Error updating order: " + error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await OrderModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error: any) {
      throw new Error("Error deleting order: " + error.message);
    }
  }
}
