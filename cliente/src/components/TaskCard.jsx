import { useNavigate } from 'react-router-dom';

function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    
    <div
      className="border border-neutral-700 p-6 rounded-xl shadow-md bg-neutral-800 hover:shadow-xl hover:border-purple-500 transition-shadow duration-200 cursor-pointer max-w-sm max-h-64 overflow-hidden"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      
      <h2 className="text-xl font-semibold text-white mb-2 max-w-xs break-words whitespace-normal">
        {task.title}
      </h2>
      <p className="max-w-xs text-neutral-300 text-base break-words whitespace-normal">
        {task.description}
      </p>
    </div>
  );
}

export default TaskCard;
