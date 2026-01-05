import ProductCard from "./ProductCard";
import type { Product } from "../../constants/products";

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number) => void;
  className?: string;
}

const ProductGrid = ({ products, onProductClick, className = "" }: ProductGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          type={product.type}
          name={product.name}
          price={parseInt(product.price.replace('$', '').trim())}
          action={() => onProductClick(product.id)}
          imageStyle="w-full h-[390px] object-cover"
          addToCart
        />
      ))}
    </div>
  );
};

export default ProductGrid;