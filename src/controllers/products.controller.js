import ProductService from "../services/productService";

module.exports = class Product {
  static async getAllProducts(request, response) {
    try {
      const products = await ProductService.getAllProducts();
      response.send(products);
    } catch (error) {
      response.status(error.status).send({ error: error.message });
    }
  }
};
