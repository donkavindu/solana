"use client";
import { useEffect, useState } from "react";

const UserTable = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/getdata");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="p-8 max-w-[90%] mx-auto text-white overflow-x-scroll">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : products.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Wallet Address</th>
              <th className="border border-gray-300 px-4 py-2">Transaction Hash</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Telegram ID</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{product.walletAddress}</td>
                <td className="border border-gray-300 px-4 py-2">{product.transactionHash || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{product.name || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{product.TelegramId || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{product.email || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default UserTable;
