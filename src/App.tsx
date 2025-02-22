import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-primary to-secondary dark:from-gray-900 dark:to-gray-800 transition-colors">
          <Header />
          <main className="container mx-auto px-6 py-10">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-3xl p-10 transition-shadow hover:shadow-3xl">
              <HomePage />
            </div>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
