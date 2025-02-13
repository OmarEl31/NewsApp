import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Newspaper } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">NewsApp</span>
          </Link>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-6 w-6 text-gray-800 dark:text-white" />
            ) : (
              <Sun className="h-6 w-6 text-gray-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header