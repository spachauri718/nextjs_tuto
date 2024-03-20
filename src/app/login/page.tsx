"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonOff, setButtonOff] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("LOGIN SUCCESSFUL", response.data);
      alert("LOGIN SUCCESSFUL");
      router.push("/profile");
    } catch (error: any) {
      console.log("LOGIN FAILED", error.message);
      alert("LOGIN FAILED");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonOff(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-3xl text-center mb-8 font-bold">
          {loading ? "Loading" : "Login"}
        </h1>
        <label htmlFor="email">Email</label>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onSignin}
          >
            {buttonOff ? "Login" : "Enter Credentials"}
          </button>
        </div>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
