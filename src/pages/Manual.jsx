import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faLightbulb,
  faBolt,
  faCloud,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
// import { FaBook } from "react-icons/fa";
// import { SlLogout } from "react-icons/sl";
// import { useAuth } from "../context/authContext";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  // Pagination,
  // Spinner,
  // getKeyValue,
} from "@nextui-org/react";
// import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
// import { useAsyncList } from "@react-stately/data";

const Manual = () => {
  const { language, translations } = useLanguage();
  const texts = translations[language];

  const [showGuide, setShowGuide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loadingChapa, setLoadingChapa] = useState(false);
  const [iconColorDoor, setIconColorDoor] = useState("text-black");
  const [loadingLuzA, setLoadingLuzA] = useState(false);
  const [iconLuzA, setIconLuzA] = useState(faLightbulb);
  const [error, setError] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [egreso, setEgreso] = useState(null);
  const [lucesA, setLucesA] = useState(false);

  const tableRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
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

  // const formatDateTime = (dateTime) => {
  //   if (!dateTime) return "- - -";
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: true,
  //     timeZoneName: "short",
  //   };
  //   return dateTime.toLocaleString("en-US", options);
  // };

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

  const cards = [
    {
      id: 1,
      title: texts.manual.title1,
      description: texts.manual.description1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-12 h-12 text-[#080808] dark:text-gray-200 mb-4"
        >
          <path
            d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
            className="transition-colors duration-300"
            // Cambia el color de relleno según el modo (light/dark)
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: texts.manual.title2,
      description: texts.manual.description2,
      content: (
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
                ? "text-[#434343] mb-1"
                : "text-green-500 mb-1"
            }
          />
          <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 text-gray-900 dark:text-gray-100">
            {iconColorDoor === "text-black" ? texts.app.lock : texts.app.unlock}
          </span>
          {loadingChapa && <Message message={texts.app.loading} />}
        </button>
      ),
    },
    {
      id: 3,
      title: texts.manual.title3,
      description: texts.manual.description3,
      content: (
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
            className={lucesA ? "text-yellow-500 mb-1" : "text-[#434343] mb-1"}
          />
          <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 text-gray-900 dark:text-gray-100">
            {lucesA ? texts.app.on : texts.app.off}
          </span>
          {loadingLuzA && <Message message={texts.app.loading} />}
        </button>
      ),
    },
    {
      id: 4,
      title: texts.manual.title4,
      description: texts.manual.description4,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-12 h-12 text-[#080808] dark:text-gray-200 mb-4"
        >
          <path
            d="M32 0C49.7 0 64 14.3 64 32V48l69-17.2c38.1-9.5 78.3-5.1 113.5 12.5c46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1V345.8c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4c-37.9-19-81.3-23.7-122.5-13.4L64 384v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V400 334 64 32C0 14.3 14.3 0 32 0zM64 187.1l64-13.9v65.5L64 252.6V318l48.8-12.2c5.1-1.3 10.1-2.4 15.2-3.3V238.7l38.9-8.4c8.3-1.8 16.7-2.5 25.1-2.1l0-64c13.6 .4 27.2 2.6 40.4 6.4l23.6 6.9v66.7l-41.7-12.3c-7.3-2.1-14.8-3.4-22.3-3.8v71.4c21.8 1.9 43.3 6.7 64 14.4V244.2l22.7 6.7c13.5 4 27.3 6.4 41.3 7.4V194c-7.8-.8-15.6-2.3-23.2-4.5l-40.8-12v-62c-13-3.8-25.8-8.8-38.2-15c-8.2-4.1-16.9-7-25.8-8.8v72.4c-13-.4-26 .8-38.7 3.6L128 173.2V98L64 114v73.1zM320 335.7c16.8 1.5 33.9-.7 50-6.8l14-5.2V251.9l-7.9 1.8c-18.4 4.3-37.3 5.7-56.1 4.5v77.4zm64-149.4V115.4c-20.9 6.1-42.4 9.1-64 9.1V194c13.9 1.4 28 .5 41.7-2.6l22.3-5.2z"
            className="transition-colors duration-300"
            // Cambia el color de relleno según el modo (light/dark)
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-96 max-w-7xl mx-auto h-max  md:px-12 xl:px-6">
      <div className="md:w-2/3 lg:w-1/2">
        <h2 className="my-8 text-2xl font-bold text-[#080808] dark:text-gray-200 md:text-4xl">
          <FontAwesomeIcon
            icon={faBook}
            className="text-[#080808] dark:text-gray-200 text-[2rem] mr-2"
          />
          {texts.manual.manual}
        </h2>

        <p className="text-[#080808] dark:text-gray-200">
          {texts.manual.manualdescription}
        </p>
      </div>
      {/* Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {cards.map((card, index) => (
    <div
      key={index}
      className={`group relative bg-[#e9e7e7] dark:bg-[#1E1F20] transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 rounded-xl p-6 ${
        index > currentIndex ? "opacity-0" : "opacity-100"
      } transition-opacity duration-500 ease-in-out`}
    >
      {card.icon}
      <div className="ml-4 flex-grow">
        <h3 className="text-2xl font-bold text-[#080808] dark:text-gray-200 mb-2">
          {card.title}
        </h3>
        <p className="text-[#3c3636] dark:text-gray-200 mb-4">
          {card.description}
        </p>
        <div className="flex flex-col items-start">
          {/* Contenido personalizado para cada tarjeta */}
          {card.content}
        </div>
      </div>
      {index === 0 ? (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleNext}
        >
          Iniciar
        </button>
      ) : index === cards.length - 1 ? (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleNext}
        >
          Finalizar
        </button>
      ) : (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleNext}
        >
          Siguiente
        </button>
      )}
    </div>
  ))}
</div>


      {/* API */}
      <div className="mt-40">
        <h2 className="my-8 text-2xl font-bold text-[#080808] dark:text-gray-200 md:text-4xl">
          <FontAwesomeIcon
            icon={faCloud}
            className="text-[#080808] dark:text-gray-200 text-[2rem] mr-2"
          />
          {texts.manual.title5}
        </h2>
        <p className="mb-5 text-[#080808] dark:text-gray-200">AppWeb Props</p>
        {/* Tabla */}
        <Table removeWrapper aria-label="API Table">
          <TableHeader>
            <TableColumn>{texts.manual.MF}</TableColumn>
            <TableColumn>{texts.manual.Description}</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf1}</TableCell>
              <TableCell>{texts.manual.mf1D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf2}</TableCell>
              <TableCell>{texts.manual.mf2D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf3}</TableCell>
              <TableCell>{texts.manual.mf3D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf4}</TableCell>
              <TableCell>{texts.manual.mf4D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf5}</TableCell>
              <TableCell>{texts.manual.mf5D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf6}</TableCell>
              <TableCell>{texts.manual.mf6D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf7}</TableCell>
              <TableCell>{texts.manual.mf7D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf8}</TableCell>
              <TableCell>{texts.manual.mf8D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf9}</TableCell>
              <TableCell>{texts.manual.mf9D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf10}</TableCell>
              <TableCell>{texts.manual.mf10D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf11}</TableCell>
              <TableCell>{texts.manual.mf11D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf12}</TableCell>
              <TableCell>{texts.manual.mf12D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf13}</TableCell>
              <TableCell>{texts.manual.mf13D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf14}</TableCell>
              <TableCell>{texts.manual.mf14D}</TableCell>
            </TableRow>
            <TableRow className="dark:text-zinc-200">
              <TableCell>{texts.manual.mf15}</TableCell>
              <TableCell>{texts.manual.mf15D}</TableCell>
            </TableRow>
            {/* Puedes agregar más filas según tus necesidades */}
          </TableBody>
        </Table>

        {/* FIN Tabla */}
      </div>
      {/* END API */}
    </div>
  );
};

export default Manual;
