import React, { createContext, useState } from "react";
import languagedata from "./languagedata";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language is English

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const value = {
    language,
    switchLanguage,
    texts: languagedata[language], // Get the corresponding language texts
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
