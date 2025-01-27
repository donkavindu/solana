"use client";
import UserTable from "@/components/shared/admin/Users";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "password";


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === adminUsername && password === adminPassword) {
      setIsLogged(true);
      setLoading(true); 
    } else {
      alert("Invalid username or password");
    }
  };

  if (!isLogged) {
    return (
      <div className="flex items-center justify-center mt-16 text-white">
        <form
          onSubmit={handleLogin}
          className="p-10 rounded-[20px] border border-[#FD60F3] bg-[#0B4F99]/30 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Admin Login
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:outline-none focus:ring-2 w-full px-3 py-2 border border-[#FD60F3] rounded bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none focus:ring-2 w-full px-3 py-2 border border-[#FD60F3] rounded bg-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="h-10 w-full rounded bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 mt-3 mx-auto"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  const renderDetailsSection = () => {
    if (activeSection === "user") {
      return (
        <UserTable/>
      );
    }
    if (activeSection === "product") {
      return (
        <div>product</div>
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-4xl text-center mt-10">
          Welcome to <br />
          Solana Volume Booster <br />
          Admin Dashboard.
        </p>
      </div>
    );
  };
  return (
    <div>
      <h3 className="font-bold text-2xl text-white text-center mt-12">Admin Dashboard</h3>
      <div className="mx-32 mt-5">
        <div className="w-full text-white bg-[#0B4F99]/30 font-semibold">
          <ul className="mt-4 flex  justify-center gap-10">
            <li
              onClick={() => setActiveSection("home")}
              className="cursor-pointer hover:text-[#FD60F3] py-2"
            >
              Home
            </li>
            <li
              onClick={() => setActiveSection("product")}
              className="cursor-pointer hover:text-[#FD60F3] py-2"
            >
              Product
            </li>
            <li
              onClick={() => setActiveSection("user")}
              className="cursor-pointer hover:text-[#FD60F3] py-2"
            >
              User
            </li>
          </ul>
        </div>
        <div className="w-full text-white mt-5 flex justify-center items-center">
          {renderDetailsSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
