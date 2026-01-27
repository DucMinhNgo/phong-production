import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useDocumentTitle = (titleKey, fallback) => {
  const { t } = useLanguage();
  
  useEffect(() => {
    const title = titleKey ? t(titleKey, fallback) : fallback;
    document.title = `${title} - Towa Industrial Vietnam`;
    
    return () => {
      document.title = 'Towa Industrial Vietnam - Inventory Management System';
    };
  }, [t, titleKey, fallback]);
};