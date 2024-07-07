import { useState } from 'react';

const MobileNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    // Aquí podrías implementar la lógica para cambiar el tema de la aplicación
    // por ejemplo, cambiando clases en el body o aplicando estilos globales.
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">Mi App</span>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-300">Inicio</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">Acerca</a>
            </li>
          </ul>
          <div className="ml-4 flex items-center">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-gray-300">Perfil</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300">Configuración</a>
              </li>
            </ul>
            <div className="ml-4 flex items-center">
              <span className="text-white mr-2">Dark Mode</span>
              <label htmlFor="darkModeToggle" className="switch">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="toggle-input"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
