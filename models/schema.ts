import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  walletAddress: { type: String, required: true },
  transactionHash: { type: String, default: null },
  name: { type: String, default: null },
  TelegramId: { type: String, default: null },
  email: { type: String, default: null },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
