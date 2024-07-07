import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Clock, Settings, HelpCircle, LogIn, UserPlus, Moon, Sun, Globe } from 'react-feather';
import { FaInfoCircle, FaEnvelope, FaCertificate, FaBook, FaShieldAlt } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { language, translations, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(localStorage.getItem('sidebarOpen') === 'true');
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const { pathname } = useLocation();
  const helpRef = useRef(null);
  const settingsRef = useRef(null);
  const sidebarRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuTitle, setSubMenuTitle] = useState('');
  const [subMenuItems, setSubMenuItems] = useState([]);
  const subMenuRef = useRef(null);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  };

  // Effect to close Help and Settings options when clicking outside
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

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  // Open sidebar
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Effect to save sidebar open state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarOpen', open);
  }, [open]);

  // Effect to save dark mode preference to localStorage and apply it
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Effect to save language selection to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Show suboptions Help
  const toggleHelpOptions = () => {
    setShowHelpOptions(!showHelpOptions);
    setShowSettingsOptions(false);
  };
  // Show suboptions Settings
  const toggleSettingsOptions = () => {
    setShowSettingsOptions(!showSettingsOptions);
    setShowHelpOptions(false);
  };
  // Dark mode on/off
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // Language
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
  };

  const texts = translations[language];

  const Menus = [
    {
      title: texts.sidebar.home,
      Icon: Home,
      path: '/app',
      visible: pathname === '/app' || pathname === '/record' || pathname === '/copyright' || pathname === '/about-us' || pathname === '/contact-us' || pathname === '/license' || pathname === '/manual' || pathname === '/privacy-policy',
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
      visible: pathname === '/app' || pathname === '/record' || pathname === '/copyright' || pathname === '/about-us' || pathname === '/contact-us' || pathname === '/license' || pathname === '/manual' || pathname === '/privacy-policy',
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
            <div className={`flex items-center justify-between w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${darkMode ? 'bg-[#1E1F20]' : 'bg-[#F0F4F9]'}`}>
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
            <div className={`flex flex-col w-full px-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${darkMode ? 'bg-[#1E1F20]' : 'bg-[#F0F4F9]'}`}>
              <div className="flex items-center">
                <Globe className="text-blue-500" />
                <span className="ml-4">{texts.sidebar.translate}</span>
              </div>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
              >
                <option value="ch">{texts.sidebar.chinese}</option>
                <option value="fr">{texts.sidebar.french}</option>
                <option value="hi">{texts.sidebar.hindi}</option>
                <option value="es">{texts.sidebar.spanish}</option>
                <option value="en">{texts.sidebar.english}</option>
              </select>
            </div>
          ),
        },
      ],
      visible: pathname === '/app' || pathname === '/record' || pathname === '/copyright' || pathname === '/about-us' || pathname === '/contact-us' || pathname === '/license' || pathname === '/manual' || pathname === '/privacy-policy' || pathname === '/' || pathname === '/signup',
    },
  ];

  const openSubMenu = (title, items) => {
    setSubMenuTitle(title);
    setSubMenuItems(items);
    setIsSubMenuOpen(true);
  };

  // Inicia el return principal
  return (
    <div
      className={`md:hidden bg-[#F0F4F9] dark:bg-[#1E1F20] ${pathname === "/" || pathname === "/signup" ? "hidden" : ""}`}
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
                  {Menus.map((item) => (
                    <div key={item.title}>
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="block rounded-md px-3 py-2 text-base font-medium hover:bg-light-white hover:shadow-md text-[#080808] dark:text-[#EFEEEE]"
                          aria-current={pathname === item.path ? "page" : undefined}
                          onClick={closeSidebar}
                        >
                          <span className="flex items-center">
                            <item.Icon />
                            <span className="ml-2">{item.title}</span>
                          </span>
                        </Link>
                      ) : (
                        <button
                          className="block rounded-md px-3 py-2 text-base font-medium hover:bg-light-white hover:shadow-md text-[#080808] dark:text-[#EFEEEE]"
                          onClick={() => {
                            if (item.title === texts.sidebar.help) {
                              openSubMenu(texts.sidebar.help, item.subMenus);
                            } else if (item.title === texts.sidebar.settings) {
                              openSubMenu(texts.sidebar.settings, item.subMenus);
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
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Submenu */}
        {isSubMenuOpen && (
          <div
            ref={subMenuRef}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            onClick={closeSubMenu}
          >
            <div
              className="bg-[#F0F4F9] dark:bg-[#1E1F20] rounded-lg shadow-lg p-4 fixed inset-x-0 bottom-0 w-full max-w-screen-md mt-36 sub-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-medium mb-4 text-[#080808] dark:text-[#EFEEEE]">
                {subMenuTitle}
              </h2>
              <div className="space-y-2">
                {subMenuItems.map((item, index) => (
                  <div key={index}>
                    {/* Se despliega el componente */}
                    {item.component ? (
                      <div>
                        {item.component}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={closeSubMenu}
                        className="block px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center">
                          {item.icon && <span className="mr-2">{item.icon}</span>}
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

// function NavbarWrapper2() {
//   const { pathname } = useLocation();
//   if (pathname === "/" || pathname === "/signup") return null;
//   return <Navbar />;
// }

export default Navbar;
