import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/connectdb";
import Product from "../../models/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const products = await Product.find({});
    return res.status(200).json(products);
  }

  res.status(405).json({ error: "Method not allowed" });
}
