import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { availableLanguages } from '../translations';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center" 
        type="button" 
        id="languageDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
        style={{ 
          fontSize: '0.875rem',
          minWidth: '100px',
          whiteSpace: 'nowrap'
        }}
      >
        <span className="me-2" style={{ fontSize: '1.1em' }}>
          {currentLang?.flag}
        </span>
        <span className="d-none d-sm-inline">
          {currentLang?.name}
        </span>
        <span className="d-sm-none">
          {currentLang?.code.toUpperCase()}
        </span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="languageDropdown">
        {availableLanguages.map((language) => (
          <li key={language.code}>
            <button
              className={`dropdown-item d-flex align-items-center ${
                currentLanguage === language.code ? 'active' : ''
              }`}
              onClick={() => changeLanguage(language.code)}
              style={{ fontSize: '0.875rem' }}
            >
              <span className="me-2" style={{ fontSize: '1.1em' }}>
                {language.flag}
              </span>
              <span>{language.name}</span>
              {currentLanguage === language.code && (
                <i className="fas fa-check ms-auto text-success"></i>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;