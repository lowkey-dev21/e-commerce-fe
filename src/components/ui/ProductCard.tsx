import { cn } from "../../lib/utils";
import Button from "./Button";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";

interface ProductI {
  image?: string;
  imageStyle?: string;
  type?: string;
  description?: string;
  action?: () => void;
  id?: number;
  className?: string;
  price?: number;
  quantity?: number;
  color?: string;
  name?: string;
  addToCart?: boolean;
  subtitle?: string;
}

export default function ProductCard({
  image,
  type,
  name,
  price,
  action,
  id,
  className,
  imageStyle,
  addToCart,
  quantity = 1,
  color,
  subtitle,
}: ProductI) {
  const { addItem } = useCart();
  const [selectedSize] = useState("L");
  const [selectedColor] = useState(color || "Black");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && name && price && image) {
      addItem({
        id,
        name,
        subtitle: subtitle || type || "",
        price,
        image,
        size: selectedSize,
        color: selectedColor,
      });
    }
  };

  return (
    <div onClick={action} className={cn(" flex flex-col ", className)}>
      <img src={image} alt={name} className={imageStyle} />
      <div>
        <div className=" flex w-full  -mb-5 mt-3 items-center gap-2">
          <small className="text-[#272727]/70">{type}</small>
          {color && quantity > 1 && (
            <div className="flex items-center gap-1">
              <div
                className={`border-[1px] border-[#272727] w-[12px] h-[12px] `}
                style={{ backgroundColor: color }}
              />
              <small className="text-[#272727]/70 ">+{quantity}</small>
            </div>
          )}
        </div>
        <br />
        <div className="w-full text-xl font-medium flex items-center justify-between">
          <h1>{name}</h1>
          <h1>${price}</h1>
        </div>
      </div>

      {addToCart && (
        <Button
          text={"Add to Cart"}
          className=" flex items-center justify-center mt-4 bg-[#272727] text-[#ebebeb]"
          onClick={handleAddToCart}
        />
      )}
    </div>
  );
}
