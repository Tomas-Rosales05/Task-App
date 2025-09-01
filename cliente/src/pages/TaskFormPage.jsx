import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, getTask, updateTask } from "../api/TasksApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      toast.error("Usuario no identificado. Por favor inicia sesión.");
      return;
    }

    const taskData = { ...data, user: user_id };

    if (params.id) {
      await updateTask(params.id, taskData);
      toast.success("Tarea actualizada correctamente");
    } else {
      await createTask(taskData);
      toast.success("Tarea creada correctamente");
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
      } else {
        reset({ title: "", description: "" });
      }
    }
    loadTask();
  }, [params.id]);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <form
        onSubmit={onSubmit}
        className="bg-neutral-900 shadow-lg rounded-lg p-6 space-y-6 border border-neutral-800"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 placeholder-neutral-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}

        <textarea
          rows="3"
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full h-[300px] bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 placeholder-neutral-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none transition"
        />
        {errors.description && (
          <span className="max-w-sm text-red-500 text-sm">
            This field is required
          </span>
        )}

        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-md transition-colors font-semibold w-full"
        >
          Guardar
        </button>
      </form>

      {params.id && (
        <div className="mt-6 text-center">
          <button
            type="button"
            className="ite text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 block justify-rigth"
            onClick={async () => {
              if (
                window.confirm(
                  "¿Estás seguro de que deseas eliminar esta tarea?"
                )
              ) {
                await deleteTask(params.id);
                toast.success("Tarea eliminada");
                navigate("/tasks/");
              }
            }}
          >
            Eliminar Tarea
          </button>
        </div>
      )}
    </div>
  );
}
