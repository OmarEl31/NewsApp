import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <HomePage />
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;