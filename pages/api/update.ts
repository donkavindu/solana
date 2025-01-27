import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/connectdb";
import Product from "../../models/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const { productName, walletAddress, transactionHash, name, TelegramId, email } = req.body;

      if (!productName || !walletAddress) {
        return res.status(400).json({ message: "Product Name and Wallet Address are required" });
      }

      await connectDB();

      const product = await Product.findOneAndUpdate(
        { productName, walletAddress },
        { transactionHash, name, TelegramId, email },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully", data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
