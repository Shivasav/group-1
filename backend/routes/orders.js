import express from "express";
import Order from "../models/orders.js";

const router = express.Router();

// Handle the order placement
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      items,
      total,
    });

    // Save the order to the database
    await newOrder.save();

    console.log("Order saved to database:", newOrder);

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error saving the order:", error);
    res.status(500).json({ message: "Error saving the order" });
  }
});

export default router;
