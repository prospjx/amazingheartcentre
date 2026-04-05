import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Appointments from './pages/Appointments';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import Admin from './pages/Admin';

export type Page = 'home' | 'about' | 'services' | 'contact' | 'appointments' | 'blog' | 'resources' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'contact':
        return <Contact />;
      case 'appointments':
        return <Appointments />;
      case 'blog':
        return <Blog />;
      case 'resources':
        return <Resources setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
