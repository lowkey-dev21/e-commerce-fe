import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import type { Product, Size } from "../../constants/products";
import { PRODUCTS, SIZES } from "../../constants/products";
import { SVGS } from "../../constants/home";

const Productdetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<Size | "">("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default colors for the abstract print shirt design
  const defaultColors = [
    { name: "White", value: "#FFFFFF" },
    { name: "Gray", value: "#9CA3AF" },
    { name: "Black", value: "#000000" },
    { name: "Mint", value: "#A7F3D0" },
    { name: "Blue", value: "#93C5FD" },
  ];

  // Mock product images for carousel
  const productImages = [
    product?.image || "",
    product?.image || "",
    product?.image || "",
    product?.image || "",
    product?.image || "",
  ];

  useEffect(() => {
    if (id) {
      const foundProduct = PRODUCTS.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct({
          ...foundProduct,
          name: "ABSTRACT PRINT SHIRT",
          price: "$99",
          description:
            "Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.",
        });
        setSelectedColor(defaultColors[0].name);
      } else {
        navigate("/products");
      }
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log("Added to cart:", {
      product,
      color: selectedColor,
      size: selectedSize,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[6rem]">
      {/* Back Button */}
      <div className="fixed hidden md:block top-20 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-2  hover:shadow-xl transition-shadow duration-200"
        >
          {SVGS.arrowBack}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Product Image */}
        <div className="relative">
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Image Thumbnails */}
        <div className="bg-white px-4 py-4">
          <div className="flex space-x-2 overflow-x-auto">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                  currentImageIndex === index
                    ? "border-black"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white px-4 py-6">
          <h1 className="text-xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 text-sm mb-1">MRP incl. of all taxes</p>
          <p className="text-2xl font-bold mb-4">{product.price}</p>
          <p className="text-gray-700 text-sm mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex space-x-3">
              {defaultColors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded border-2 ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Size</h3>
              <button className="text-xs text-gray-500 underline">
                FIND YOUR SIZE | MEASUREMENT GUIDE
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm border ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full flex justify-center h-[50px] items-center text-center text-black py-4 text-xl font-medium tracking-wider"
            text={"Add"}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-12">
            {/* Left - Product Images */}
            <div>
              <div className="mb-4  ">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className=" w-full h-[600px] object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square border-2 ${
                      currentImageIndex === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Details */}
            <div className="pt-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                
              </div>

              <p className="text-2xl font-bold mb-2">{product.price}</p>
              <p className="text-gray-600 text-sm mb-6">
                MRP incl. of all taxes
              </p>
              <p className="text-gray-700 mb-8">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4">Color</h3>
                <div className="flex space-x-3">
                  {defaultColors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded border-2 ${
                        selectedColor === color.name
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Size</h3>
                  <button className="text-xs text-gray-500 underline">
                    FIND YOUR SIZE | MEASUREMENT GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 max-w-xs">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm border ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full max-w-xs bg-gray-300 text-black py-4 text-sm font-medium tracking-wider hover:bg-gray-400 transition-colors"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
