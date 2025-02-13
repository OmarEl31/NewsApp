import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-white" />
      </button>
      
      <span className="text-gray-800 dark:text-white">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ChevronRight className="h-5 w-5 text-gray-800 dark:text-white" />
      </button>
    </div>
  );
};

export default Pagination