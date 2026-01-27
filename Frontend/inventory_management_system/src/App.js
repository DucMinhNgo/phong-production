import './App.css';
import './i18n.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';
import Users from './components/Users';
import InsertUser from './components/InsertUser';
import About from './components/About';
import { LanguageProvider } from './contexts/LanguageContext';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { currentLanguage } = useLanguage();

  return (
    <div className="App" lang={currentLanguage}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/insertuser" element={<InsertUser />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
