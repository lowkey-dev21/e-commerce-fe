interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search",
  className = "" 
}: SearchBarProps) => {
  return (
    <div className={`relative max-w-md ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#d4d4d4] rounded-none border-none focus:outline-none focus:ring-0"
      />
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;