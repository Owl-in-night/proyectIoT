import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { Link, useLocation } from "react-router-dom";
import { Menu, HelpCircle, Home, Clock, Settings, Moon, Sun, Globe } from "react-feather";
import { FaInfoCircle, FaEnvelope, FaCertificate, FaBook, FaShieldAlt } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const { language, translations, changeLanguage } = useLanguage();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [subMenuTitle, setSubMenuTitle] = useState("");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true"? true : false);
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);
  const subMenuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    }
  }, [changeLanguage]);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleLanguageChange = (selectedOption) => {
    changeLanguage(selectedOption.value);
    localStorage.setItem('language', selectedOption.value);
  };

  const texts = translations[language];

  const openSubMenu = (title, items) => {
    setSubMenuTitle(title);
    setSubMenuItems(items);
    setIsSubMenuOpen(true);
    setIsSidebarOpen(false);
  };

  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
    setSubMenuItems([]);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      subMenuRef.current &&
      !subMenuRef.current.contains(e.target)
    ) {
      closeSidebar();
      closeSubMenu();
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen, isSubMenuOpen]);

  const mainNavigation = [
    {
      name: texts.navbar.home,
      to: "/app",
      icon: <Home className="h-6 w-6 mr-2" />,
      current: false,
    },
    {
      name: texts.navbar.help,
      icon: <HelpCircle className="h-6 w-6 mr-2" />,
      current: false,
    },
    {
      name: texts.navbar.record,
      to: "/record",
      icon: <Clock className="h-6 w-6 mr-2" />,
      current: false,
    },
    {
      name: texts.navbar.settings,
      icon: <Settings className="h-6 w-6 mr-2" />,
      current: false,
      onClick: () => openSubMenu(texts.navbar.settings, settingsSubNavigation),
    },
  ];

  const helpSubNavigation = [
    { name: texts.navbar.aboutUs, to: "/about-us", icon: <FaInfoCircle /> },
    { name: texts.navbar.contactUs, to: "/contact-us", icon: <FaEnvelope /> },
    { name: texts.navbar.license, to: "/license", icon: <FaCertificate /> },
    { name: texts.navbar.manual, to: "/manual", icon: <FaBook /> },
    {
      name: texts.navbar.privacyPolicy,
      to: "/privacy-policy",
      icon: <FaShieldAlt />,
    },
  ];

  const settingsSubNavigation = [
    {
      name: texts.navbar.darkMode,
      component: ({ darkMode, toggleDarkMode }) => (
        <div
          className={`flex items-center justify-between w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            darkMode ? "bg-[#1E1F20]" : "bg-[#F0F4F9]"
          }`}
        >
          <div className="flex items-center">
            {darkMode ? (
              <Moon className="text-gray-600 dark:text-gray-200" />
            ) : (
              <Sun className="text-yellow-500" />
            )}
            <span className="ml-4">
              {darkMode ? texts.sidebar.darkMode : texts.sidebar.lightMode}
            </span>
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
      name: texts.navbar.translate,
      component: ({ language, handleLanguageChange, darkMode }) => {
        const options = [
          { value: "ch", label: texts.navbar.chinese },
          { value: "fr", label: texts.navbar.french },
          { value: "hi", label: texts.navbar.hindi },
          { value: "es", label: texts.navbar.spanish },
          { value: "en", label: texts.navbar.english },
        ];

        const customStyles = {
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: state.selectProps.menuColor,
            color: darkMode ? "#fff" : "#000",
          }),
          menuList: (provided, state) => ({
            ...provided,
            backgroundColor: state.selectProps.menuColor,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? state.selectProps.menuColor
              : provided.backgroundColor,
            color: state.isSelected ? "#fff" : darkMode ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: state.selectProps.hoverColor,
            },
          }),
          control: (provided, state) => ({
            ...provided,
            backgroundColor: state.selectProps.controlColor,
            borderColor: state.selectProps.borderColor,
            color: darkMode ? "#fff" : "#000",
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: darkMode ? "#fff" : "#000",
          }),
        };

        return (
          <div className="flex flex-col px-2 py-2 text-sm text-gray-800 dark:text-gray-200 mt-4">
            <div className="flex items-center">
              <Globe className="text-blue-500 mr-2" />
              <span>{texts.navbar.translate}</span>
            </div>
            <Select
              value={options.find((option) => option.value === language)}
              onChange={handleLanguageChange}
              options={options}
              styles={customStyles}
              menuPlacement="top"
              isSearchable={false}
              menuColor={darkMode ? "#1E1F20" : "#F0F4F9"}
              hoverColor={darkMode ? "#3B3C3D" : "#E2E8F0"}
              controlColor={darkMode ? "#1E1F20" : "#F0F4F9"}
              borderColor={darkMode ? "#3B3C3D" : "#E2E8F0"}
              className="mt-2 p-2 bg-[#F0F4F9] text-gray-800 dark:bg-[#1E1F20] dark:text-gray-200 rounded-md"
            />
          </div>
        );
      },
    },
  ];
//Return principal de la navbar
  return (
    <div
      className={`md:hidden bg-[#F0F4F9] dark:bg-[#1E1F20] ${
        pathname === "/" || pathname === "/signup" ? "hidden" : ""
      }`}
    >
      <nav ref={sidebarRef} className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-[#080808] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeSidebar}
            ></div>
            <div ref={sidebarRef} className="fixed inset-y-0 left-0 w-64 bg-[#F0F4F9] dark:bg-[#1E1F20] z-50 overflow-y-auto shadow-lg">
              <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-8 h-4 w-4">
                  <div>{/* Insert your logo or company name here */}</div>
                  <button
                    className="inline-flex items-center justify-center p-2 rounded-md text-[#080808] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={closeSidebar}
                  >
                    <span className="sr-only">Close main menu</span>
                    <Menu className="relative h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-4">
                  {mainNavigation.map((item) => (
                    <div key={item.name}>
                      {item.to ? (
                        <Link
                          to={item.to}
                          className="block rounded-md px-3 py-2 text-base font-medium hover:bg-light-white hover:shadow-md text-[#080808] dark:text-[#EFEEEE]"
                          aria-current={item.current ? "page" : undefined}
                          onClick={closeSidebar}
                        >
                          <span className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                          </span>
                        </Link>
                      ) : (
                        <button
                          className="block rounded-md px-3 py-2 text-base font-medium hover:bg-light-white hover:shadow-md text-[#080808] dark:text-[#EFEEEE]"
                          onClick={() => {
                            if (item.name === texts.navbar.help) {
                              openSubMenu(texts.navbar.help, helpSubNavigation);
                            } else if (item.name === texts.navbar.settings) {
                              openSubMenu(texts.navbar.settings, settingsSubNavigation);
                            }
                          }}
                        >
                          <span className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Submenu */}
        {isSubMenuOpen && (
          <div
            ref={subMenuRef} className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            onClick={closeSubMenu}
          >
            <div
              className="bg-[#F0F4F9] dark:bg-[#1E1F20] rounded-lg shadow-lg p-4 fixed inset-x-0 bottom-0 w-full max-w-screen-md mt-36 sub-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-medium mb-4 text-[#080808] dark:text-[#EFEEEE] bg-[#F0F4F9] dark:bg-[#1E1F20]">
                {subMenuTitle}
              </h2>
              <div className="space-y-2">
                {subMenuItems.map((item, index) => (
                  <div key={index}>
                    {/* Se despliga el componente */}
                    {item.component ? (
                      <item.component
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                        language={language}
                        handleLanguageChange={handleLanguageChange}
                      />
                    ) : (
                      <Link
                        to={item.to}
                        onClick={closeSubMenu}
                        className="block px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

// function NavbarWrapper() {
//   const { pathname } = useLocation();
//   if (pathname === "/" || pathname === "/signup") return null;
//   return <Navbar />;
// }

export default Navbar;
