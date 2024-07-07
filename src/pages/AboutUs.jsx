import { useLanguage } from "../context/LanguageContext";
import { FcGoogle } from "react-icons/fc";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function AboutUs() {
  const { language, translations } = useLanguage();
  const texts = translations[language];

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Eddy Omar Arreaga Lopez",
      position: "CEO",
      imageUrl: "/Images/1.png",
      correoI: "ca.informatica@uvg.edu.gt",
    },
    {
      id: 2,
      name: "Erick Leonel Güinac Hernández",
      position: "CEO",
      imageUrl: "/Images/2.png",
      correoI: "elguinac@uvg.edu.gt",
    },
    {
      id: 3,
      name: "Edith Marlene López Morales",
      position: "CEO",
      imageUrl: "/Images/3.png",
      correoI: "emlopez@uvg.edu.gt",
    },
    {
      id: 4,
      name: "Evelyn Lucía Alvarado de León",
      position: "Desarrolladora",
      imageUrl: "/Images/4.png",
      correoI: "alv15308@uvg.edu.gt",
    },
    {
      id: 5,
      name: "José Miguel Castro Chuj",
      position: "Desarrollador",
      imageUrl: "/Images/5.png",
      correoI: "cas201199@uvg.edu.gt",
    },
    {
      id: 6,
      name: "Santos Pedro Baltazar Joj Cano",
      position: "Desarrollador",
      imageUrl: "/Images/6.png",
      correoI: "joj15320@uvg.edu.gt",
    },
    {
      id: 7,
      name: "David Alexander Arguetea Pelicó",
      position: "Desarrollador",
      imageUrl: "/Images/7.png",
      correoI: "arg201250@uvg.edu.gt",
    },
    {
      id: 8,
      name: "Job Abraham Tun Sánchez",
      position: "Desarrollador",
      imageUrl: "/Images/8.png",
      correoI: "tun17747@uvg.edu.gt",
    },
    {
      id: 9,
      name: "Herberth Dennilson Juracán Tos",
      position: "Desarrollador",
      imageUrl: "/Images/9.png",
      correoI: "jur201103@uvg.edu.gt",
    },
    {
      id: 10,
      name: "Deysy Rossemary Sajche Mazariegos",
      position: "Desarrolladora",
      imageUrl: "/Images/10.png",
      correoI: "saj201251@uvg.edu.gt",
    },
    {
      id: 11,
      name: "Bryan Ottoniel Juracán Chiroy",
      position: "Desarrollador",
      imageUrl: "/Images/11.png",
      correoI: "jur201208@uvg.edu.gt",
    },
    {
      id: 12,
      name: "Dennis Andersson Xingo Ventura",
      position: "Desarrollador",
      imageUrl: "/Images/12.png",
      correoI: "xin15374@uvg.edu.gt",
    },
    {
      id: 13,
      name: "Emmanuel Carlos Jesús Churunel Castellanos",
      position: "Desarrollador",
      imageUrl: "/Images/13.png",
      correoI: "chu191014@uvg.edu.gt",
    },
  ];

  return (
    <>
      <div id="about" className="min-h-screen flex flex-col">
        <div className="flex-1 p-1">
          <header className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {texts.aboutus.aboutusT}
              </h1>
            </div>
          </header>
        </div>
        {/* Text */}
        <figure className="md:my-[2rem] md:flex bg-slate-100 rounded-xl p-8 md:p-0 md:max-w-[65rem] mx-auto dark:bg-[#1E1F20]">
          <img
            className="w-24 h-24 md:w-[275px] md:h-[275px] md:rounded-none rounded-full mx-auto"
            src="/Images/UVG.png"
            alt="Universidad del Valle de Guatemala"
            width="384"
            height="512"
          />
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
              <p className="text-lg font-medium dark:text-gray-200">
                {texts.aboutus.aboutusText}
              </p>
            </blockquote>
          </div>
          <img
                className="w-24 h-24 md:w-[275px] md:h-[275px] md:rounded-none rounded-full mx-auto"
                src="/Images/ING.png"
                alt="Facultad de Ingeniería"
                width="384"
                height="512"
              />
        </figure>
        {/* Button */}
        <div className="text-center mt-[100px]">
          {/* Clase para ocultar en sm y xs, pero mostrar en md, lg, xl, 2xl */}
          <a
            href="#team"
            className="hidden sm:inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            {texts.aboutus.teamButton}
          </a>
        </div>
        {/* Team */}
        <div
          id="team"
          className="max-w-7xl mx-auto mt-[125px] px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#434343] dark:text-gray-200 sm:text-4xl">
              {texts.aboutus.team}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  data-aos="fade-up"
                  className="bg-white dark:text-gray-200 dark:bg-[#1E1F20] overflow-hidden shadow rounded-lg"
                >
                  <div className="p-0">
                    <img
                      className="h-60 w-full object-cover"
                      src={member.imageUrl}
                      alt={member.name}
                    />
                    <div className="mt-4 text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {member.name}
                      </p>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                        {member.position === "CEO"
                          ? texts.aboutus.positionOne
                          : member.position === "Desarrolladora"
                          ? texts.aboutus.positionTwo
                          : texts.aboutus.positionThree}
                      </p>
                      <div className="mt-4 flex justify-center">
                        <a
                          href={`mailto:${member.correoI}`}
                          className="text-gray-400 dark:text-gray-200 hover:text-gray-500"
                        >
                          <FcGoogle className="w-10 h-10" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Button */}
          <div className="text-center mt-8 my-24">
            <a
              href="#about"
              className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              {texts.aboutus.up}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
