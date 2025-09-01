import React from 'react';
import { TasksList } from '../components/TasksList';


export function TasksPage() {
  return (
    
    <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
    bg-black/1 backdrop-blur-md text-white  py-6 ">
    
      <TasksList />
    </div>
  );
}




