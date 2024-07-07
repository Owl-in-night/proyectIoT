
import { useLanguage } from "../context/LanguageContext";

function License() {
  const { language, translations } = useLanguage();
  const texts = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 bg-white dark:bg-[#1E1F20] shadow-lg sm:rounded-lg md:max-w-5xl xl:max-w-6xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          {texts.license.license}
        </h1>
      </div>
      <div className="prose text-sm md:prose-lg text-gray-600 dark:text-gray-200">
        <p className="mb-4">{texts.license.part1}</p>
        <p className="mb-4 font-semibold">{texts.license.part2}</p>
        <p className="mb-4">{texts.license.part3}</p>
        <p className="mb-4 font-semibold">{texts.license.part4}</p>
        <p className="mb-4">{texts.license.part5}</p>
        <p className="mb-4 font-semibold">{texts.license.part6}</p>
        <p className="mb-4">{texts.license.part7}</p>
        <p className="mb-4 font-semibold">{texts.license.part8}</p>
        <p className="mb-4 ">{texts.license.part9}</p>
        <p className="mb-4">{texts.license.part10}</p>
        <p className="mb-4 font-semibold">{texts.license.part11}</p>
        <p className="mb-4">{texts.license.part12}</p>
      </div>
    </div>
  );
}

export default License;
