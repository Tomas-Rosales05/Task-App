// src/pages/RegisterUser.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUser, getUser } from "../api/TasksApi";

export function RegisterUser() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
  try {
    const users = await getUser();
    const existingUser = users.find(user => user.email === data.email);

    if (existingUser) {
      toast.error("El correo ya está registrado ❌");
      return;
    }

    const userData = { name: data.name, email: data.email, password: data.password };
    await createUser(userData);
    toast.success("Usuario creado con éxito");
    navigate("/"); 
  } catch (error) {
    toast.error("Error al crear usuario ❌");
    console.error(error);
  }
};


  return (
    <div className="flex flex-col items-center p-4">
      {/* Formulario de registro */}
      <div className="w-full max-w-md mt-8 bg-neutral-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-400">
          Crear Usuario
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="text"
            placeholder="Nombre completo"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}

          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", { required: "El correo es obligatorio" })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}

          <input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword", { required: "Debes confirmar la contraseña", validate: (value) => value === password || "Las contraseñas no coinciden" })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          {errors.confirmPassword && <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition shadow-md hover:shadow-lg"
          >
            Crear Cuenta
          </button>
        </form>
        <div className="w-full max-w-md mt-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white font-semibold transition shadow-md hover:shadow-lg"
        >
          Volver al Login
        </button>
      </div>
      </div>
    </div>
  );
}
