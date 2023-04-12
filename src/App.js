import "./App.css";
import React, { useState } from 'react';


function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => handleTabClick('home')}
          >
            Home
          </li>
          <li
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => handleTabClick('products')}
          >
            Products
          </li>
          <li
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => handleTabClick('about')}
          >
            About Us
          </li>
        </ul>
      </nav>

      <main>
        {activeTab === 'home' && (
          <div>
            <h1>Home</h1>
            <p>Welcome to our website!</p>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <h1>Products</h1>
            <p>Check out our products!</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <h1>About Us</h1>
            <p>Learn more about us!</p>
          </div>
        )}
      </main>

      {/* <style>{` .App { display: flex; } nav { width: 200px; height: 100vh; background-color: #f0f0f0; } ul { list-style-type: none; margin: 0; padding: 0; } li { padding: 10px; cursor: pointer; } li.active { background-color: #ddd; } main { flex-grow: 1; padding: 20px; } `}</style> */}
    </div>
  );
}

export default App;
