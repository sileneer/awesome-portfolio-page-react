import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { HomePage, ResumePage, ProjectsPage, ContactPage } from './components/Pages';
import portfolioData from './data/portfolio.json';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const data = portfolioData;

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage data={data} />;
      case 'resume':
        return <ResumePage data={data} />;
      case 'projects':
        return <ProjectsPage data={data} />;
      case 'contact':
        return <ContactPage data={data} />;
      default:
        return <HomePage data={data} />;
    }
  };

  return (
    <div className="App">
      <Navigation
        data={data}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
