// src/components/Navigation.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user_id"); // borra la sesión
    navigate("/"); // redirige al login
  };

  if (!isLoggedIn) return null; // no mostrar nav si no hay sesión

  return (
    <nav className="bg-transparent py-6 sticky top-0 z-50 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Task App</h1>

        <ul className="flex flex-wrap gap-4 sm:gap-6 items-center">
          {/* Botón Volver */}
          {location.pathname !== "/tasks" && location.pathname !== "/tasks-create" && (
            <li>
              <Link
                to="/tasks"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent">
                  Volver
                </span>
              </Link>
            </li>
          )}

          {/* Botón Crear Tarea */}
          <li>
            <Link
              to="/tasks-create"
              className="text-white bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 inline-flex items-center justify-center"
            >
              Crear tarea
            </Link>
          </li>

          {/* Botón Cerrar sesión */}
          <li>
            <button
              onClick={handleLogout}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
