import React, { useState, useEffect } from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { Moon, Sun } from "react-feather";
import { useLanguage } from "../../context/LanguageContext";
const ThemeSwitch = (props) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  const { language, translations} = useLanguage();
  
  const texts = translations[language];
  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {isSelected ? <Sun /> : <Moon />}
        </div>
      </Component>
      <p className="text-default-500 select-none">{isSelected ? texts.navbar.darkMode : texts.navbar.lightMode}</p>
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return <ThemeSwitch isSelected={darkMode} onChange={handleThemeChange} />;
};

export default App;
