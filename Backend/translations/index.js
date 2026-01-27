const vi = require('./vi');
const ja = require('./ja');

const translations = {
  vi,
  ja
};

const t = (language, key, fallback = key) => {
  try {
    const keys = key.split('.');
    let value = translations[language] || translations['vi'];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    return value || fallback;
  } catch (error) {
    console.warn(`Translation key "${key}" not found for language "${language}"`);
    return fallback;
  }
};

const addTranslation = (req, res, next) => {
  let language = req.headers['x-language'] || 
                 req.headers['accept-language'] || 
                 req.query.lang || 
                 'vi';
  
  language = language.split(',')[0].split('-')[0].toLowerCase();
  
  if (!translations[language]) {
    language = 'vi';
  }
  
  req.t = (key, fallback) => t(language, key, fallback);
  req.language = language;
  
  console.log(`Request language: ${language} (from ${req.headers['x-language'] ? 'X-Language header' : req.headers['accept-language'] ? 'Accept-Language header' : 'default'})`);
  
  next();
};

module.exports = {
  translations,
  t,
  addTranslation
};