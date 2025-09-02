import { useState, useMemo } from "react";
import type { Product, Category, Size } from "../constants/products";

export interface FilterState {
  selectedCategory: Category | "NEW";
  selectedSizes: Size[];
  searchQuery: string;
  expandedFilters: {
    [key: string]: boolean;
  };
}

export const useProductFilters = (products: Product[], productsPerPage: number = 12) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "NEW">("NEW");
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilters, setExpandedFilters] = useState<{
    [key: string]: boolean;
  }>({
    availability: true,
    category: false,
    colors: false,
    priceRange: false,
    collections: false,
    tags: false,
    ratings: false,
  });

  const handleSizeToggle = (size: Size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleFilter = (filterName: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory =
        selectedCategory === "NEW" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return {
    // State
    selectedCategory,
    selectedSizes,
    searchQuery,
    expandedFilters,
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    
    // Actions
    setSelectedCategory: (category: Category | "NEW") => {
      setSelectedCategory(category);
      resetToFirstPage();
    },
    setSelectedSizes,
    setSearchQuery: (query: string) => {
      setSearchQuery(query);
      resetToFirstPage();
    },
    handleSizeToggle,
    toggleFilter,
    handlePageChange,
  };
};