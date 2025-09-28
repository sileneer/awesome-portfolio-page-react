import React from 'react';
import './Navigation.css';

const Navigation = ({ data, currentPage, onNavigate }) => {
  const { brand, menuItems } = data.navigation;

  const handleBrandClick = () => {
    onNavigate('home');
  };

  const handleMenuClick = (path, pageName) => {
    onNavigate(pageName);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={handleBrandClick}>
          {brand}
        </div>
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <button
                className={`nav-link ${currentPage === item.name.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.path, item.name.toLowerCase())}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
