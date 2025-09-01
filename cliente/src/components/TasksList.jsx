import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/TasksApi';
import TaskCard from './TaskCard';

export function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setTasks([]);
        return;
      }
      const res = await getAllTasks(user_id);
      setTasks(res);
    }
    loadTasks();
  }, []);

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-white mb-8">
        Lista de Tareas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {tasks.length === 0 && (
          <p className="text-center text-white col-span-full">No hay tareas para mostrar</p>
        )}
        {tasks.map(task => (
          <TaskCard className="col-span-1" key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
