import { useLanguage } from "../context/LanguageContext";
function PrivacyP() {
  const { language, translations } = useLanguage();
  const texts = translations[language];
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-slate-100 dark:bg-[#1E1F20] shadow-lg sm:rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          {texts.privacyp.policyp}
        </h1>
      </div>
      <div className="text-gray-700 prose lg:prose-lg mx-auto dark:text-gray-200">
        <p className="mb-4">{texts.privacyp.part1}</p>
      </div>
    </div>
  );
}

export default PrivacyP;
