import React from "react";
import { Link } from "react-router-dom";

import "../styles/header.css";

export default function Header({ t, currentLanguage, handleLanguageChange }) {
  return (
    <header>
      <Link to="/">
        <h2 className="logo">{t("Haircuts By Edwin")}</h2>
      </Link>
      <div className="language-radio-group">
        <label htmlFor="en">
          <input
            id="en"
            type="radio"
            name="language"
            value="en"
            checked={currentLanguage === "en"}
            onChange={handleLanguageChange}
          />
          English
        </label>
        <label htmlFor="nl">
          <input
            id="nl"
            type="radio"
            name="language"
            value="nl"
            checked={currentLanguage === "nl"}
            onChange={handleLanguageChange}
          />
          Dutch
        </label>
      </div>
    </header>
  );
}
