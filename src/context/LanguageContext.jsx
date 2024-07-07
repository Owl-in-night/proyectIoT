// LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json'; // Ajusta la ruta según tu estructura de archivos
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import ch from '../locales/ch.json';
import hi from '../locales/hi.json';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // Establece el idioma por defecto aquí

  const translations = {
    en,
    es,
    fr,
    ch,
    hi,
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    // Guardar el idioma seleccionado en localStorage
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};