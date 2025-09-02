import type { Category } from "../../constants/products";

interface CategoryTabsProps {
  categories: readonly (Category | "NEW")[];
  selectedCategory: Category | "NEW";
  onCategoryChange: (category: Category | "NEW") => void;
  className?: string;
}

const CategoryTabs = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = "" 
}: CategoryTabsProps) => {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.slice(0, 6).map((category, index) => (
          <button
            key={`top-${category}-${index}`}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm border ${
              selectedCategory === category
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.slice(6).map((category, index) => (
          <button
            key={`bottom-${category}-${index}`}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm border ${
              selectedCategory === category
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;