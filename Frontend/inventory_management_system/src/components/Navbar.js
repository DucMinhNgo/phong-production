import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar navbar-expand-lg bg-danger shadow-sm">
      <div className="container-fluid px-3">
        {/* Brand/Logo */}
        <a className="navbar-brand text-white fw-bold d-flex align-items-center" href="/">
          <span className="me-2">🏭</span>
          <div className="d-flex flex-column">
            <span className="navbar-brand-main" style={{ fontSize: '1.1rem', lineHeight: '1.2' }}>
              Towa Industrial Vietnam
            </span>
            <small className="navbar-brand-sub" style={{ fontSize: '0.75rem', opacity: '0.9' }}>
              東和インダストリアルベトナム
            </small>
          </div>
        </a>

        {/* Mobile toggle button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white px-3 py-2 rounded" href="/products">
                <i className="fas fa-box me-1"></i>
                {t('nav.products')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white px-3 py-2 rounded" href="/users">
                <i className="fas fa-users me-1"></i>
                {t('nav.users')}
              </a>
            </li>
          </ul>

          {/* Right side items */}
          <div className="d-flex align-items-center flex-column flex-lg-row gap-2">
            {/* Search form - hidden on small screens */}
            <form className="d-none d-lg-flex" role="search">
              <div className="input-group input-group-sm">
                <input 
                  className="form-control" 
                  type="search" 
                  placeholder={t('nav.searchPlaceholder')} 
                  aria-label={t('nav.search')}
                  style={{ width: '200px' }}
                />
                <button className="btn btn-outline-light" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>

            {/* Language switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="d-lg-none">
        <div className="container-fluid px-3 pb-2">
          <form className="d-flex" role="search">
            <div className="input-group input-group-sm">
              <input 
                className="form-control" 
                type="search" 
                placeholder={t('nav.searchPlaceholder')} 
                aria-label={t('nav.search')}
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}
