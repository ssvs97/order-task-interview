import Product from "../models/products";

export default class ProductService {
  static async getAllProducts() {
    const products = await Product.find();
    return products;
  }

  static async getProductById(id) {
    try {
      const products = await Product.findById(id);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProductQuantity(id, quantity) {
    const products = await Product.findByIdAndUpdate(id, {
      $inc: { quantity },
    });
    return products;
  }
}
