import type { Size } from "../../constants/products";

interface FilterSidebarProps {
  showFilters: boolean;
  onCloseFilters: () => void;
  sizes: readonly Size[];
  selectedSizes: Size[];
  onSizeToggle: (size: Size) => void;
  expandedFilters: { [key: string]: boolean };
  onToggleFilter: (filterName: string) => void;
}

const FilterSidebar = ({
  showFilters,
  onCloseFilters,
  sizes,
  selectedSizes,
  onSizeToggle,
  expandedFilters,
  onToggleFilter,
}: FilterSidebarProps) => {
  const filterSections = [
    { name: "Category", key: "category" },
    { name: "Colors", key: "colors" },
    { name: "Price Range", key: "priceRange" },
    { name: "Collections", key: "collections" },
    { name: "Tags", key: "tags" },
    { name: "Ratings", key: "ratings" },
  ];

  const getFilterDescription = (filterName: string) => {
    const descriptions: { [key: string]: string } = {
      Category: "Select product categories",
      Colors: "Choose from available colors",
      "Price Range": "Set your budget range",
      Collections: "Browse our collections",
      Tags: "Filter by product tags",
      Ratings: "Filter by customer ratings",
    };
    return descriptions[filterName] || "";
  };

  return (
    <div
      className={`${
        showFilters ? "block" : "hidden"
      } fixed md:top-[12rem] md:block w-[45%] md:w-80 p-6 md:px-10`}
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
          Filters
          <button
            className="md:hidden rotate-180"
            onClick={onCloseFilters}
          >
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
        </h2>

        {/* Size Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => onSizeToggle(size)}
                className={`px-4 py-2 border text-sm ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <h3
            className="font-medium mb-3 flex items-center justify-between cursor-pointer"
            onClick={() => onToggleFilter("availability")}
          >
            Availability
            <svg
              className={`w-4 h-4 transition-transform ${
                expandedFilters.availability ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </h3>
          {expandedFilters.availability && (
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">
                  Availability <span className="text-blue-600">(450)</span>
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">
                  Out Of Stock <span className="text-blue-600">(18)</span>
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Other Filters */}
        {filterSections.map(filter => (
          <div key={filter.key} className="mb-4">
            <h3
              className="font-medium mb-2 flex items-center justify-between cursor-pointer"
              onClick={() => onToggleFilter(filter.key)}
            >
              {filter.name}
              <svg
                className={`w-4 h-4 transition-transform ${
                  expandedFilters[filter.key] ? "rotate-90" : ""
                }`}
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
            </h3>
            {expandedFilters[filter.key] && (
              <div className="pl-2 space-y-2">
                <div className="text-sm text-gray-600">
                  {getFilterDescription(filter.name)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;