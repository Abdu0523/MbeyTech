import IRepository from "./IRepository";
import { IOrder } from "../../data/interfaces/IOrder";
import OrderModel from "../../data/models/Order.entity";
import OrderDetailModel from "../../data/models/OrderDetail.entity";
import mongoose from "mongoose";
import ProductModel from "../../data/models/Product.entity";

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
      const orders = await OrderModel.find().populate("person");
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
      const order = await OrderModel.findOne({ customerId }).populate("person");
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
      throw new Error(
        "Error getting unvalidated orders for customer: " + error.message
      );
    }
  }

  async update(id: string, entity: Partial<IOrder>): Promise<IOrder | null> {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, entity, {
        new: true,
      });
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

  async getOrdersByUser(userId: string): Promise<IOrder[]> {
    try {
      // Find all products belonging to the connected user
      const userProducts = await ProductModel.find({
        person: new mongoose.Types.ObjectId(userId),
      }).exec();

      // Extract the IDs of the user's products
      const productIds = userProducts.map((product) => product._id);

      // Find the order details associated with these products
      const orderDetails = await OrderDetailModel.find({
        product: { $in: productIds },
      })
        .populate({
          path: "order",
          populate: { path: "person" },
        })
        .exec();

      // Extract unique orders from the order details
      const uniqueOrderIds = orderDetails.map(
        (orderDetail) => orderDetail.order[0]
      );
      const uniqueOrders = await OrderModel.find({
        _id: { $in: uniqueOrderIds },
      })
        .populate("person")
        .exec();

      return uniqueOrders;
    } catch (error: any) {
      throw new Error("Error getting orders by user: " + error.message);
    }
  }
}
