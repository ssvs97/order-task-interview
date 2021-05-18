import Order from "../models/orders";
import ProductService from "../services/productService";
import OrderDetailsService from "../services/orderDetailsService";
import { isEmpty, isType, sendErrorMessage } from "../utils/util";

export default class OrderService {
  static async getAllMyOrders(request) {
    const match = {};
    if (request.query.status) match.status = request.query.status;
    await request.user.populate({ path: "order", match }).execPopulate();
    return request.user.order;
  }

  static async validateCreateOrderInput(data) {
    for (let i = 0; i < data.length; i++) {
      if (isEmpty(data[i].productID))
        sendErrorMessage("product id is required");
      if (isEmpty(data[i].quantity)) sendErrorMessage("quantity is required");

      if (!isType(data[i].productID, "string"))
        sendErrorMessage("product id must be string");

      if (!isType(data[i].quantity, "number"))
        sendErrorMessage("quantity must be number");
    }
  }

  static async authenticationUserOrder(_id, userID) {
    const order = await Order.findOne({
      userID,
      _id,
    });
    return order;
  }

  static async createInitialOrder(userID) {
    const initialOrder = await new Order({
      userID,
      totalPrice: 0,
      status: true,
    });
    return initialOrder;
  }

  static async orderProcessing(initialOrder, dataInput) {
    for (let i = 0; i < dataInput.length; i++) {
      const product = await ProductService.getProductById(
        dataInput[i].productID
      );

      if (!this.isQuantityAvailable(product, dataInput[i])) {
        this.saveRejectedOrder(initialOrder);
        sendErrorMessage(
          `sorry we dont have this quantity of ${product.productName}`
        );
      }

      this.calculateTotalPrice(product, initialOrder, dataInput[i]);

      await OrderDetailsService.createOrderDetails(
        initialOrder._id,
        dataInput[i].productID,
        dataInput[i].quantity
      );
    }
    await this.saveAcceptedOrder(initialOrder);

    await this.updateProductsQuantity(dataInput);

    return initialOrder;
  }

  static isQuantityAvailable(product, dataInput) {
    return product.quantity > dataInput.quantity;
  }

  static async saveAcceptedOrder(initialOrder) {
    await initialOrder.save();
  }

  static async saveRejectedOrder(initialOrder) {
    try {
      initialOrder.status = false;
      await initialOrder.save();
    } catch (error) {
      console.log(error);
    }
  }

  static async calculateTotalPrice(product, initialOrder, dataInput) {
    initialOrder.totalPrice = product.price * dataInput.quantity;
  }

  static async updateProductsQuantity(dataInput) {
    for (let i = 0; i < dataInput.length; i++) {
      await ProductService.updateProductQuantity(
        dataInput[i].productID,
        -dataInput[i].quantity
      );
    }
  }
}
