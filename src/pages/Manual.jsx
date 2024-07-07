import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faLightbulb,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { SlLogout } from "react-icons/sl";
import { useAuth } from "../context/authContext";

const Manual = () => {
  const { language, translations } = useLanguage();
  const texts = translations[language];
  const { signout, user } = useAuth();

  const [showGuide, setShowGuide] = useState(true);
  const [step, setStep] = useState(1);

  const [loadingChapa, setLoadingChapa] = useState(false);
  const [iconColorDoor, setIconColorDoor] = useState("text-black");
  const [loadingLuzA, setLoadingLuzA] = useState(false);
  const [iconLuzA, setIconLuzA] = useState(faLightbulb);
  const [loadingLuzB, setLoadingLuzB] = useState(false);
  const [iconLuzB, setIconLuzB] = useState(faLightbulb);
  const [loadingLuzC, setLoadingLuzC] = useState(false);
  const [iconLuzC, setIconLuzC] = useState(faLightbulb);
  const [error, setError] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [egreso, setEgreso] = useState(null);
  const [lucesA, setLucesA] = useState(false);
  const [lucesB, setLucesB] = useState(false);
  const [lucesC, setLucesC] = useState(false);

  const tableRef = useRef(null);

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleCloseGuide = () => {
    setShowGuide(false);
  };

  const releService = async () => {
    setLoadingChapa(true);
    setError(null);
    try {
      const now = new Date();
      if (!ingreso || egreso) {
        setIngreso(now);
        setEgreso(null);
        setIconColorDoor("text-green-500");
      } else {
        setEgreso(now);
        setIconColorDoor("text-black");
      }
      setLoadingChapa(false);
    } catch (error) {
      console.error("Error del servicio:", error);
      setError(
        "Hubo un problema al iniciar el servicio. Por favor, inténtalo de nuevo más tarde."
      );
      setLoadingChapa(false);
    }
  };

  const lucesService = async (
    setLight,
    setLoadingLight,
    currentLightState,
    setIcon
  ) => {
    setLoadingLight(true);
    setError(null);
    try {
      setLight(!currentLightState);
      const newIcon = currentLightState ? faLightbulb : faBolt;
      setIcon(newIcon);
      setLoadingLight(false);
    } catch (error) {
      console.error("Error del servicio:", error);
      setError(
        "Hubo un problema al iniciar el servicio. Por favor, inténtalo de nuevo más tarde."
      );
      setLoadingLight(false);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "- - -";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    return dateTime.toLocaleString("en-US", options);
  };

  const handleClickOutsideGuide = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setShowGuide(false);
    }
  };

  useEffect(() => {
    if (showGuide) {
      document.addEventListener("mousedown", handleClickOutsideGuide);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideGuide);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideGuide);
    };
  }, [showGuide]);

  const Message = ({ message }) => (
    <div className="absolute top-0 left-0 right-0 mt-[-3rem] mx-auto w-[15rem] text-center bg-white dark:bg-[#1E1F20] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg py-2 px-4 z-10">
      {message}
    </div>
  );

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-[#1E1F20]">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-[#1E1F20] shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {texts.app.electronicLock}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span className="hidden md:inline text-gray-900 dark:text-gray-100">
              {texts.app.welcome} {user?.displayName || "User"}
            </span>
          </div>
          <button className="focus:outline-none">
            <SlLogout className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-900 dark:text-gray-100" />
          </button>
        </div>
      </header>

      {showGuide && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            ref={tableRef}
          >
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                {texts.manual.title1}
                </h2>
                <p>
                {texts.manual.description1}
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                {texts.manual.title2}
                </h2>
                <p>
                {texts.manual.description2}
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                {texts.manual.title3}
                </h2>
                <p>
                {texts.manual.description3}
                </p>
              </>
            )}
            {step === 4 && (
              <>
                <h2 className="text-xl font-semibold mb-4">{texts.manual.title4}</h2>
                <p>{texts.manual.description4}</p>
              </>
            )}
            {step === 5 && (
              <>
                <h2 className="text-xl font-semibold mb-4">{texts.manual.title5}</h2>
                <p>
                {texts.manual.description5}
                </p>
              </>
            )}
            <div className="mt-4 flex justify-end space-x-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none"
                >
                  {texts.manual.previous}
                </button>
              )}
              {step < 5 ? (
                <button
                  onClick={handleNextStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                  {texts.manual.next}
                </button>
              ) : (
                <button
                  onClick={handleCloseGuide}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                  {texts.manual.close}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-around mt-10">
          <div className="text-center mb-4 md:mb-0">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
              {texts.app.timeDateIncome}
            </p>
            <p className="font-semibold text-md sm:text-lg md:text-xl text-gray-900 dark:text-gray-100">
              {formatDateTime(ingreso)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
              {texts.app.timeDateEgress}
            </p>
            <p className="font-semibold text-md sm:text-lg md:text-xl text-gray-900 dark:text-gray-100">
              {formatDateTime(egreso)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-12 mt-24 space-y-8 md:flex-row md:justify-center md:space-x-20 md:space-y-0">
          <button
            className={`focus:outline-none ${iconColorDoor} font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center relative`}
            onClick={releService}
            disabled={loadingChapa}
          >
            <FontAwesomeIcon
              icon={iconColorDoor === "text-black" ? faLock : faUnlock}
              size="3x"
              className={
                iconColorDoor === "text-black"
                  ? "text-gray-700 mb-1"
                  : "text-green-500 mb-1"
              }
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 text-gray-900 dark:text-gray-100">
              {iconColorDoor === "text-black"
                ? texts.app.lock
                : texts.app.unlock}
            </span>
            {loadingChapa && (
              <Message message={texts.app.loading} />
            )}
          </button>

          <button
            className={`focus:outline-none ${
              lucesA ? "text-yellow-500" : "text-black"
            } font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center relative`}
            onClick={() =>
              lucesService(setLucesA, setLoadingLuzA, lucesA, setIconLuzA)
            }
            disabled={loadingLuzA}
          >
            <FontAwesomeIcon
              icon={iconLuzA}
              size="3x"
              className={lucesA ? "text-yellow-500 mb-1" : "text-gray-700 mb-1"}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 text-gray-900 dark:text-gray-100">
              {lucesA ? texts.app.on : texts.app.off}
            </span>
            {loadingLuzA && (
              <Message message={texts.app.loading} />
            )}
          </button>

          <button
            className={`focus:outline-none ${
              lucesB ? "text-yellow-500" : "text-black"
            } font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center relative`}
            onClick={() =>
              lucesService(setLucesB, setLoadingLuzB, lucesB, setIconLuzB)
            }
            disabled={loadingLuzB}
          >
            <FontAwesomeIcon
              icon={iconLuzB}
              size="3x"
              className={lucesB ? "text-yellow-500 mb-1" : "text-gray-700 mb-1"}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 text-gray-900 dark:text-gray-100">
              {lucesB ? texts.app.on : texts.app.off}
            </span>
            {loadingLuzB && (
              <Message message={texts.app.loading} />
            )}
          </button>

          <button
            className={`focus:outline-none ${
              lucesC ? "text-yellow-500" : "text-black"
            } font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center relative`}
            onClick={() =>
              lucesService(setLucesC, setLoadingLuzC, lucesC, setIconLuzC)
            }
            disabled={loadingLuzC}
          >
            <FontAwesomeIcon
              icon={iconLuzC}
              size="3x"
              className={lucesC ? "text-yellow-500 mb-1" : "text-gray-700 mb-1"}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 text-gray-900 dark:text-gray-100">
              {lucesC ? texts.app.on : texts.app.off}
            </span>
            {loadingLuzC && (
              <Message message={texts.app.loading} />
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-full max-w-md text-center rounded-md">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-20 mt-48 p-4 max-w-full overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {texts.manual.API}
          </h2>
          <div className="overflow-hidden border border-gray-500 rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider"
                  >
                      {texts.manual.MF}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider"
                  >
                    {texts.manual.Description}
                  </th>
                </tr>
              </thead>
              <tbody className=" bg-white divide-y divide-gray-200 dark:bg-[#1E1F20] dark:divide-gray-700">
                <tr className="text-gray-900 dark:text-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    releService()
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {texts.app.releServiceDescription}
                  </td>
                </tr>
                <tr className="text-gray-900 dark:text-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    lucesService()
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {texts.app.lucesServiceDescription}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual;
