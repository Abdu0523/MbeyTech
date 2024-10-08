import IRepository from "./IRepository";
import { IOrderDetail } from "../../data/interfaces/IOrderDetail";
import OrderDetailModel from "../../data/models/OrderDetail.entity";
import mongoose from "mongoose";
import ProductModel from "../../data/models/Product.entity";

export class OrderDetailRepository implements IRepository<any> {
  getByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async add(entity: IOrderDetail): Promise<IOrderDetail> {
    try {
      const newOrderDetail = await OrderDetailModel.create(entity);
      return newOrderDetail;
    } catch (error: any) {
      throw new Error("Error adding order detail: " + error.message);
    }
  }

  async getAll(): Promise<IOrderDetail[]> {
    try {
      const orderDetails = await OrderDetailModel.find();
      return orderDetails;
    } catch (error: any) {
      throw new Error("Error getting all order details: " + error.message);
    }
  }

  async getById(id: string): Promise<IOrderDetail | null> {
    try {
      const orderDetail = await OrderDetailModel.findById(id);
      return orderDetail;
    } catch (error: any) {
      throw new Error("Error getting order detail by ID: " + error.message);
    }
  }

  async getOrderDetailsForOrder(orderId: string): Promise<any[]> {
    try {
      const orderDetails = await OrderDetailModel.find({order: new mongoose.Types.ObjectId(orderId) })
        .populate("order")
        .populate("product");
      return orderDetails;
    } catch (error: any) {
      throw new Error(
        "Error getting order details for order: " + error.message
      );
    }
  }

  async getOrderDetailsForOrderAndUser(orderId: string, userId: string): Promise<any[]> {
    try {
      // Trouver tous les produits appartenant à l'utilisateur connecté
      const userProducts = await ProductModel.find({
        person: new mongoose.Types.ObjectId(userId),
      }).exec();
  
      // Extraire les identifiants des produits de l'utilisateur
      const productIds = userProducts.map((product) => product._id);
  
      // Trouver les détails de la commande associés à ces produits et à l'identifiant de la commande donné
      const orderDetails = await OrderDetailModel.find({
        order: new mongoose.Types.ObjectId(orderId),
        product: { $in: productIds },
      })
        .populate("order")
        .populate("product");
  
      return orderDetails;
    } catch (error: any) {
      throw new Error(
        "Error getting order details for order: " + error.message
      );
    }
  }
  

  async update(
    id: string,
    entity: Partial<IOrderDetail>
  ): Promise<IOrderDetail | null> {
    try {
      const updatedOrderDetail = await OrderDetailModel.findByIdAndUpdate(
        id,
        entity,
        { new: true }
      );
      return updatedOrderDetail;
    } catch (error: any) {
      throw new Error("Error updating order detail: " + error.message);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await OrderDetailModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error: any) {
      throw new Error("Error deleting order detail: " + error.message);
    }
  }
}
