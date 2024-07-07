import React from "react";
import {
  Globe,
} from "react-feather";
import { useLanguage } from "../../context/LanguageContext";

function SettingsTranslate() {
  const {language, translations} = useLanguage();

  const texts = translations[language];

  return (
    <div className="flex items-center">
      <Globe className="text-blue-500" />
      <span className="ml-4">{texts.navbar.translate}</span>
    </div>
  );
}

export default SettingsTranslate;
