import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/connectdb";
import Product from "../../models/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { productName, walletAddress } = req.body;

      if (!productName || !walletAddress) {
        return res.status(400).json({ message: "Product Name and Wallet Address are required" });
      }

      await connectDB();

      // Check if already exists
      const existingProduct = await Product.findOne({ productName, walletAddress });

      if (existingProduct) {
        return res.status(200).json({ message: "Product already exists", data: existingProduct });
      }

      // Save new product
      const newProduct = new Product({
        productName,
        walletAddress,
        transactionHash: null,
        name: null,
        TelegramId: null,
        email: null,
      });

      await newProduct.save();
      res.status(201).json({ message: "Product saved successfully", data: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
