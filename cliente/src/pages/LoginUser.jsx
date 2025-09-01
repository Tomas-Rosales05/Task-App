// src/pages/LoginUser.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "../api/TasksApi";

export function LoginUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const users = await getUser();
      const user = users.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (user) {
        localStorage.setItem("user_id", user.id);
        toast.success("Login exitoso 🎉");
        navigate("/tasks");
      } else {
        toast.error("Credenciales incorrectas ❌");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor 🔌");
      console.error(error);
    }
  };

  return (
    <div className="flex mt-20 items-center justify-center ">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-6">
          Bienvenido 🚀
        </h1>
        <p className="text-center text-neutral-300 mb-8">
          Ingresa a tu cuenta para continuar
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", { required: "El correo es obligatorio" })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          {errors.email && (
            <span className="text-red-400 text-sm">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="off"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          {errors.password && (
            <span className="text-red-400 text-sm">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition shadow-md hover:shadow-lg"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-neutral-400">¿No tienes cuenta?</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-3 w-full py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition shadow-md hover:shadow-lg"
          >
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  );
}
