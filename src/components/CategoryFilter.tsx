import React from 'react';
import { Category } from '../types/news';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors
            ${selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;