import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
