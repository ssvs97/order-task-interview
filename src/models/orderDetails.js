//declaration packages
import { Schema, model } from "mongoose";

//declaration schema
const orderDetailsSchema = new Schema({
  orderID: {
    type: String,
    trim: true,
    required: true,
  },
  productID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
});

const OrderDetails = model("OrderDetails", orderDetailsSchema);

export default OrderDetails;
