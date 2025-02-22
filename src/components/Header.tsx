import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Newspaper } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-r from-primary to-secondary dark:from-gray-900 dark:to-gray-800 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo et Titre */}
        <Link to="/" className="flex items-center space-x-4 group">
          {/* Icône dynamique */}
          <div
            className={`p-3 rounded-full transform group-hover:rotate-12 transition-transform ${
              theme === 'light' ? 'bg-blue-100' : 'bg-accent'
            }`}
          >
            <Newspaper
              className={`h-7 w-7 transition-colors ${
                theme === 'light' ? 'text-blue-900' : 'text-white'
              }`}
            />
          </div>

          {/* Titre dynamique */}
          <span
            className={`text-3xl font-extrabold tracking-wide transition-colors ${
              theme === 'light' ? 'text-blue-900' : 'text-white'
            }`}
          >
            News<span className="text-accent">Hub</span>
          </span>
        </Link>

        {/* Toggle Dark/Light Mode */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
