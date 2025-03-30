import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("Registration successful! Check your email to verify.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/login", data);
        //   alert("Login successful!");
        Swal.fire({
            title: "Success!",
            text: "Login successsful",
            icon: "success",
            background: "#1a202c",
            color: "#fff",
            confirmButtonColor: "#3085d6",
        })
        navigate("/");
    } catch (error) {
    //   alert("Login failed. Check your credentials.");
        Swal.fire({
            title: "Login Failed",
            text: 'Invalid Credentials',
            icon: "error",
            background: "#1a202c",
            color: "#fff",
            confirmButtonColor: "#d33",
        })
        } finally {
        setLoading(false);
        }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-400">Register</a>
        </p>
      </div>
    </div>
  );
};

export { Register, Login };