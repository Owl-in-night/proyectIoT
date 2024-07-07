import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Home,
  Clock,
  Settings,
  HelpCircle,
  LogIn,
  UserPlus,
} from "react-feather";
import {
  FaInfoCircle,
  FaEnvelope,
  FaCertificate,
  FaBook,
  FaShieldAlt,
} from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";
import { Select, SelectItem } from "@nextui-org/react";
import { languages } from "../../locales/language";
import ThemeSwitch from "./ThemeSwitch";
import SettingsTranslate from "./SettingsTranslate";
import IconSwitch from "./IconSwitch"
const Navbar = () => {
  const { language, translations, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(
    localStorage.getItem("navbarOpen") === "true"
  );
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const { pathname } = useLocation();
  const helpRef = useRef(null);
  const settingsRef = useRef(null);
  const sidebarRef = useRef(null);
  const subMenuRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuTitle, setSubMenuTitle] = useState("");
  const [subMenuItems, setSubMenuItems] = useState([]);

  const toggleNavbar = () => {
    setOpen(!open);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelpOptions(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsOptions(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        closeSubMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("navbarOpen", open);
  }, [open]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleLanguageChange = (event) => {
    try {
      const selectedLanguage = event.target.value;
      if (selectedLanguage !== language) {
        changeLanguage(selectedLanguage);
      }
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const texts = translations[language];

  const Menus = [
    {
      title: texts.navbar.signIn,
      Icon: LogIn,
      path: "/",
      visible: pathname === "/" || pathname === "/signup",
    },
    {
      title: texts.navbar.signUp,
      Icon: UserPlus,
      path: "/signup",
      visible: pathname === "/" || pathname === "/signup",
    },
    {
      title: texts.navbar.home,
      Icon: Home,
      path: "/app",
      visible:
        pathname === "/app" ||
        pathname === "/record" ||
        pathname === "/copyright" ||
        pathname === "/about-us" ||
        pathname === "/contact-us" ||
        pathname === "/license" ||
        pathname === "/manual" ||
        pathname === "/privacy-policy",
    },
    {
      title: texts.navbar.help,
      Icon: HelpCircle,
      subMenus: [
        {
          title: texts.navbar.aboutUs,
          path: "/about-us",
          icon: <FaInfoCircle />,
        },
        {
          title: texts.navbar.contactUs,
          path: "/contact-us",
          icon: <FaEnvelope />,
        },
        {
          title: texts.navbar.license,
          path: "/license",
          icon: <FaCertificate />,
        },
        { title: texts.navbar.manual, path: "/manual", icon: <FaBook /> },
        {
          title: texts.navbar.privacyPolicy,
          path: "/privacy-policy",
          icon: <FaShieldAlt />,
        },
      ],
      visible:
        pathname === "/app" ||
        pathname === "/record" ||
        pathname === "/copyright" ||
        pathname === "/about-us" ||
        pathname === "/contact-us" ||
        pathname === "/license" ||
        pathname === "/manual" ||
        pathname === "/privacy-policy",
    },
    {
      title: texts.navbar.record,
      Icon: Clock,
      path: "/record",
      visible: pathname === "/app" || pathname === "/record",
    },
    {
      title: texts.navbar.settings,
      Icon: Settings,
      subMenus: [
        {
          title: texts.navbar.darkMode,
          component: (
            <div
              className={`flex items-center justify-between w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200 dark:bg-[#1E1F20] hover:bg-gray-200 dark:hover:bg-gray-700 ${
                darkMode ? "bg-[#1E1F20]" : "bg-[#F0F4F9]"
              }`}
            >
              <ThemeSwitch />
            </div>
          ),
        },
        {
          title: texts.navbar.translate,
          component: (
            <div
              className={`flex flex-col w-full px-2 py-2 text-sm text-gray-800 dark:bg-[#1E1F20] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                darkMode ? "bg-[#1E1F20]" : "bg-[#F0F4F9]"
              }`}
            >
              <SettingsTranslate />
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
      visible:
        pathname === "/app" ||
        pathname === "/record" ||
        pathname === "/copyright" ||
        pathname === "/about-us" ||
        pathname === "/contact-us" ||
        pathname === "/license" ||
        pathname === "/manual" ||
        pathname === "/" ||
        pathname === "/signup" ||
        pathname === "/privacy-policy",
    },
  ];

  const openSubMenu = (title, items) => {
    setSubMenuTitle(title);
    setSubMenuItems(items);
    setIsSubMenuOpen(true);
    closeSidebar();
  };

  return (
    <div
      className={`lg:hidden bg-[#F0F4F9] dark:bg-[#1E1F20] transition-all duration-500 ease-in-out ${
        darkMode ? "dark" : ""
      }`}
    >
      <nav ref={sidebarRef} className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-[#080808] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu
                  className="block h-6 w-6 transition-transform duration-500 ease-in-out"
                  aria-hidden="true"
                  onClick={toggleNavbar}
                />
              </button>
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out"
              onClick={closeSidebar}
            ></div>
            <div
              ref={sidebarRef}
              className="fixed inset-y-0 left-0 w-64 bg-[#F0F4F9] dark:bg-[#1E1F20] z-50 overflow-y-auto shadow-lg transition-transform duration-500 ease-in-out"
            >
              <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-8 h-4 w-4">
                  <div>{/* Insert your logo or company name here */}</div>
                  <button
                    className="inline-flex items-center justify-center p-2 rounded-md text-[#080808] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset"
                    onClick={closeSidebar}
                  >
                    <span className="sr-only">Close main menu</span>
                    <Menu className="relative h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-4">
                  <IconSwitch />
                  {Menus.map(
                    (item) =>
                      item.visible && (
                        <div key={item.title}>
                          {item.path ? (
                            <Link
                              to={item.path}
                              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-light-white hover:shadow-md text-[#080808] dark:text-[#EFEEEE] transition-colors duration-500 ease-in-out"
                              aria-current={
                                pathname === item.path ? "page" : undefined
                              }
                              onClick={closeSidebar}
                            >
                              <span className="flex items-center">
                                <item.Icon />
                                <span className="ml-2">{item.title}</span>
                              </span>
                            </Link>
                          ) : (
                            <button
                              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-light-white hover:shadow-md text-[#080808] dark:text-[#EFEEEE] transition-colors duration-500 ease-in-out"
                              onClick={() => {
                                if (item.title === texts.navbar.help) {
                                  openSubMenu(texts.navbar.help, item.subMenus);
                                } else if (
                                  item.title === texts.navbar.settings
                                ) {
                                  openSubMenu(
                                    texts.navbar.settings,
                                    item.subMenus
                                  );
                                }
                              }}
                            >
                              <span className="flex items-center">
                                <item.Icon />
                                <span className="ml-2">{item.title}</span>
                              </span>
                            </button>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {isSubMenuOpen && (
          <div
            ref={subMenuRef}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out"
            onClick={closeSubMenu}
          >
            <div
              className="bg-[#F0F4F9] dark:bg-[#1E1F20] rounded-lg shadow-lg p-4 fixed inset-x-0 bottom-0 w-full max-w-screen-md mt-36 sub-menu transition-transform duration-500 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-medium mb-4 text-[#080808] dark:text-[#EFEEEE]">
                {subMenuTitle}
              </h2>
              <div className="space-y-2">
                {subMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.component ? (
                      <div>{item.component}</div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeSubMenu}
                        className="block px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-500 ease-in-out"
                      >
                        <div className="flex items-center">
                          {item.icon && (
                            <span className="mr-2">{item.icon}</span>
                          )}
                          <span>{item.title}</span>
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

export default Navbar;
