import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Clock, Settings, HelpCircle, LogIn, UserPlus, Moon, Sun, Globe } from 'react-feather';
import { FaInfoCircle, FaEnvelope, FaCertificate, FaBook, FaShieldAlt } from 'react-icons/fa';
import { Select, SelectItem } from "@nextui-org/react";
import { languages } from "../../locales/language";
import { useLanguage } from '../../context/LanguageContext';
import IconL from '../../../public/Icons/Icon_Light';
import IconD from '../../../public/Icons/Icon_Dark';

const Sidebar = () => {
  const { language, translations, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(localStorage.getItem('sidebarOpen') === 'true');
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const { pathname } = useLocation();
  const helpRef = useRef(null);
  const settingsRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelpOptions(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsOptions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    localStorage.setItem('sidebarOpen', open);
  }, [open]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleHelpOptions = () => {
    setShowHelpOptions(!showHelpOptions);
    setShowSettingsOptions(false);
  };

  const toggleSettingsOptions = () => {
    setShowSettingsOptions(!showSettingsOptions);
    setShowHelpOptions(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  const texts = translations[language];

  const Menus = [
    {
      title: texts.sidebar.signIn,
      Icon: LogIn,
      path: '/',
      visible: pathname === '/' || pathname === '/signup',
    },
    {
      title: texts.sidebar.signUp,
      Icon: UserPlus,
      path: '/signup',
      visible: pathname === '/' || pathname === '/signup',
    },
    {
      title: texts.sidebar.home,
      Icon: Home,
      path: '/app',
      visible: pathname === '/app' || pathname === '/record' || pathname === '/copyright' || pathname === '/about-us' || pathname === '/contact-us' || pathname === '/license' || pathname === '/manual'  || pathname === '/privacy-policy',
    },
    {
      title: texts.sidebar.help,
      Icon: HelpCircle,
      subMenus: [
        { title: texts.sidebar.aboutUs, path: '/about-us', icon: <FaInfoCircle /> },
        { title: texts.sidebar.contactUs, path: '/contact-us', icon: <FaEnvelope /> },
        { title: texts.sidebar.license, path: '/license', icon: <FaCertificate /> },
        { title: texts.sidebar.manual, path: '/manual', icon: <FaBook /> },
        { title: texts.sidebar.privacyPolicy, path: '/privacy-policy', icon: <FaShieldAlt /> },
      ],
      visible: pathname === '/app' || pathname === '/record' || pathname === '/copyright' || pathname === '/about-us' || pathname === '/contact-us' || pathname === '/license' || pathname === '/manual'  || pathname === '/privacy-policy',
    },
    {
      title: texts.sidebar.record,
      Icon: Clock,
      path: '/record',
      visible: pathname === '/app' || pathname === '/record',
    },
    {
      title: texts.sidebar.settings,
      Icon: Settings,
      subMenus: [
        {
          title: texts.sidebar.darkMode,
          component: (
            <div className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <div className="flex items-center">
                {darkMode ? (
                  <Moon className="text-gray-600 dark:text-gray-200" />
                ) : (
                  <Sun className="text-yellow-500" />
                )}
                <span className="ml-4">{darkMode ? texts.sidebar.darkMode : texts.sidebar.lightMode}</span>
              </div>
              <label
                htmlFor="darkModeToggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ),
        },
        {
          title: texts.sidebar.translate,
          component: (
            <div className="flex flex-col w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Globe className="text-blue-500" />
                <span className="ml-4">{texts.sidebar.translate}</span>
              </div>
              <Select
                disallowEmptySelection
                value={language}
                onChange={handleLanguageChange}
                defaultSelectedKeys={[language]}
                className="mt-2 p-2 bg-gray-200 dark:bg-[#1E1F20] text-gray-800 dark:text-gray-200 rounded-md"
              >
                {languages[language].map((lang) => (
                  <SelectItem
                    className="dark:text-gray-200"
                    key={lang.key}
                    value={lang.key}
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          ),
        },
      ],
      visible: pathname === '/app' || pathname === '/record' || pathname === '/copyright' || pathname === '/about-us' || pathname === '/contact-us' || pathname === '/license' || pathname === '/manual'  || pathname === '/privacy-policy' || pathname === '/' || pathname === '/signup',
    },
  ];

  return (
    <div className="flex">
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-10 transition-width duration-300 ease-in-out hidden lg:block ${open ? 'w-72' : 'w-20'} bg-gray-100 dark:bg-[#1E1F20] p-5 pt-8 shadow-md`}
      >
        <Menu
          className={`absolute cursor-pointer top-9 w-9 text-black dark:text-white transition-transform duration-500`}
          onClick={toggleSidebar}
        />
        <div className="flex gap-x-4 items-center"></div>
        <ul className="pt-9">
          <div className="flex items-center w-full">
            <span className="mr-2">
              {darkMode ? <IconD /> : <IconL />}
            </span>
            <span className={`ml-2 ${!open ? 'hidden' : ''} origin-left duration-500 ease-in-out`} data-translate>
            </span>
          </div>
          {Menus.map(
            (menu, index) =>
              menu.visible !== false && (
                <li
                  key={index}
                  className={`flex flex-col p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm items-start gap-x-4 mt-2 ${index === 0 ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                  onClick={(e) => {
                    if (menu.subMenus) {
                      e.stopPropagation();
                      if (menu.title === texts.sidebar.help) {
                        toggleHelpOptions();
                      } else if (menu.title === texts.sidebar.settings) {
                        toggleSettingsOptions();
                      }
                    }
                  }}
                >
                  {menu.subMenus ? (
                    <>
                      <div className="relative">
                        <div className="flex items-center w-full">
                          {menu.Icon && <menu.Icon />}
                          <span
                            className={`ml-2 ${
                              !open ? 'hidden' : ''
                            } origin-left duration-500 ease-in-out`}
                            data-translate
                          >
                            {menu.title}
                          </span>
                        </div>
                        {menu.title === texts.sidebar.help && (
                          <div
                            ref={helpRef}
                            className={`absolute top-0 left-full mt-[-10px] mr-2 w-44 bg-gray-100 dark:bg-[#1E1F20] rounded-lg shadow-md overflow-hidden transition-opacity duration-500 ease-in-out z-50 ${
                              showHelpOptions
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                            }`}
                          >
                            <ul className="py-1">
                              {menu.subMenus.map((subMenu, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    to={subMenu.path}
                                    className="block px-5 py-2 flex items-center text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleHelpOptions();
                                    }}
                                  >
                                    {subMenu.icon && (
                                      <span className="mr-2">
                                        {subMenu.icon}
                                      </span>
                                    )}
                                    {subMenu.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {menu.title === texts.sidebar.settings && (
                          <div
                            ref={settingsRef}
                            className={`absolute top-0 left-full mt-[-10px] mr-2 w-44 bg-gray-100 dark:bg-[#1E1F20] rounded-lg shadow-md overflow-hidden transition-opacity duration-500 ease-in-out z-40 ${
                              showSettingsOptions
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                            }`}
                          >
                            <ul className="py-1">
                              {menu.subMenus.map((subMenu, subIndex) => (
                                <li key={subIndex}>
                                  {subMenu.component || (
                                    <Link
                                      to={subMenu.path}
                                      className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleSettingsOptions();
                                      }}
                                    >
                                      {subMenu.title}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={menu.path}
                      className="flex items-center w-full"
                    >
                      {menu.Icon && <menu.Icon />}
                      <span
                        className={`ml-2 ${
                          !open ? 'hidden' : ''
                        } origin-left duration-500 ease-in-out`}
                      >
                        {menu.title}
                      </span>
                    </Link>
                  )}
                </li>
              )
          )}
        </ul>
      </div>
      <div className={`flex-1 transition-all duration-300 ease-in-out ${open ? 'lg:pl-72' : 'lg:pl-20'}`}>
        {/* Aquí va el contenido principal de la aplicación */}
      </div>
    </div>
  );
};

export default Sidebar;
