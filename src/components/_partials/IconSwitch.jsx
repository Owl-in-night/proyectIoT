import React, { useState, useEffect, useRef } from "react";
import IconL from "../../../public/Icons/Icon_Light";
import IconD from "../../../public/Icons/Icon_Dark";
export default function IconSwitch() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  return (
    <div>
       {/* Icono */}
       <div className="flex items-center w-full">
              <span className="mr-2">
                {darkMode ? <IconD /> : <IconL />} {/* Cambio dinámico de ícono */}
              </span>
              <span className={`ml-2 ${!open ? 'hidden' : ''} origin-left duration-500 ease-in-out`} data-translate>
              </span>
            </div>
          {/* Fin Icono */}
    </div>
  );
}
