//declaration packages
import { Schema, model } from "mongoose";

//declaration schema
const productSchema = new Schema({
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;
