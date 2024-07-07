import { useLanguage } from "../context/LanguageContext";

function CopyR() {
  const { language, translations } = useLanguage();
  const texts = translations[language];

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8 bg-slate-100 dark:bg-[#1E1F20] shadow-lg sm:rounded-lg">
        <header className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {texts.copyR.copyright}
            </h1>
          </div>
        </header>
        <div className="text-gray-700 prose lg:prose-lg mx-auto dark:text-gray-200">
          <p className="mb-4">{texts.copyR.part1}</p>
        </div>
      </div>
    </>
  );
}

export default CopyR;
