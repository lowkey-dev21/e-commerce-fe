import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryTabs from "../../components/ui/CategoryTabs";
import FilterSidebar from "../../components/ui/FilterSidebar";
import ProductGrid from "../../components/ui/ProductGrid";
import SearchBar from "../../components/ui/SearchBar";
import Pagination from "../../components/ui/Pagination";
import { CATEGORIES, PRODUCTS, SIZES } from "../../constants/products";
import { useProductFilters } from "../../hooks/useProductFilters";

const Products = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  // Use custom hook for filter logic with pagination
  const {
    selectedCategory,
    selectedSizes,
    searchQuery,
    expandedFilters,
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    setSelectedCategory,
    setSearchQuery,
    handleSizeToggle,
    toggleFilter,
    handlePageChange,
  } = useProductFilters(PRODUCTS, 12);

  const handleProductClick = (productId: number) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1800px] mx-auto">
        {/* Breadcrumb for mobile */}
        <div className="px-6 md:px-10 md:hidden block text-center ">
          <nav className="text-sm text-gray-600">
            <span>Home</span> /{" "}
            <span className="font-medium text-black">Products</span>
          </nav>
        </div>

        {/* Title */}
        <div className="px-6 md:px-10 mt-1 mb-8">
          <h1
            className={`text-3xl md:text-4xl block md:hidden text-center font-bold  `}
          >
            PRODUCTS
          </h1>
        </div>

        {/* Search Bar */}
        <div className="px-6 md:hidden block md:px-10 mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="flex  ">
          {/* Filters Sidebar */}
          <FilterSidebar
            showFilters={showFilters}
            onCloseFilters={() => setShowFilters(false)}
            sizes={SIZES}
            selectedSizes={selectedSizes}
            onSizeToggle={handleSizeToggle}
            expandedFilters={expandedFilters}
            onToggleFilter={toggleFilter}
          />

          {/* Main Content */}
          <div
            className={`flex-1 md:ml-[20%] ${showFilters ? "ml-[40%]" : ""}  `}
          >
            {/* Breadcrumb */}
            <div className="px-6 md:px-10 hidden md:flex ">
              <nav className="text-sm text-gray-600">
                <span>Home</span> /{" "}
                <span className="font-medium text-black">Products</span>
              </nav>
            </div>

            {/* Title */}
            <div className="px-6 md:px-10 mt-1 mb-8">
              <h1 className={`text-3xl md:text-4xl hidden md:flex font-bold  `}>
                PRODUCTS
              </h1>
            </div>

            {/* Search Bar */}
            <div className="px-6 hidden md:block md:px-10 mb-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Mobile Filters Button */}
            <div
              className={`md:hidden ${showFilters ? "hidden" : ""} px-6 mb-4`}
            >
              <button
                onClick={() => setShowFilters(true)}
                className="text-xl font-semibold mb-4 flex items-center justify-between"
              >
                Filters
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Category Tabs */}
            <CategoryTabs
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              className="px-6 md:px-10 mb-8"
            />

            {/* Products Grid */}
            <div className="px-6 md:px-10">
              <ProductGrid
                products={paginatedProducts}
                onProductClick={handleProductClick}
              />
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8 mb-8"
              />
              
              {/* Results Info */}
              <div className="text-center text-sm text-gray-600 mt-4">
                Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
