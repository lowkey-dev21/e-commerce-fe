import ProductCard from "../ui/ProductCard";
import Product5 from "../../assets/images/product5.png";
import Product6 from "../../assets/images/product6.png";
import Product7 from "../../assets/images/product7.png";
import Product8 from "../../assets/images/product8.png";
import Button from "../ui/Button";
import { SVGS } from "../../constants/home";

interface ProductsI {
  name: string;
  type: string;
  price: string;
  quantity?: number;
  color?: string;
  image: string;
  id: string;
}

const NewThisWeek = () => {
  const products: ProductsI[] = [
    {
      name: "Embroidered Seersucker",
      type: "V-Neck T-Shirt",
      price: "$99",
      color: "white",
      image: Product5,
      quantity: 1,
      id: "1",
    },
    {
      name: "Basic SLime FIt T-Shirt",
      type: "Cotton T-Shirt",
      price: "$40",
      image: Product6,
      quantity: 5,
      color: "#A3A3A3",
      id: "2",
    },
    {
      name: "Basic Print FIt T-Shirt",
      type: "Henley T-Shirt",
      id: "3",
      price: "$40",
      image: Product7,
      quantity: 3,
      color: "#A3A3A3",
    },
    {
      name: "Full Sleeve Zipper",
      type: "Crewneck T-Shirt",
      id: "4",
      price: "$40",
      image: Product8,
      quantity: 5,
      color: "#000E8A",
    },
  ];
  return (
    <div className="w-full md:px-10 px-6 ">
      <div className="flex mb-[3rem] items-center w-[400px] justify-between">
        <h1 className="font-bold md:text-6xl text-5xl">
          NEW <br />
          THIS WEEK
        </h1>
        <span className="text-[#000E8A] font-bold text-2xl">{`(${products.reduce(
          (sum, product) => sum + (product.quantity || 0),
          0
        )})`}</span>
      </div>

      <div className=" flex flex-col items-center mb-6 ">
        <div className="flex w-full   gap-3 pb-6 overflow-x-auto">
          {products.map(product => (
            <ProductCard
              key={product.id}
              id={parseInt(product.id)}
              type={product.type}
              name={product.name}
              price={parseInt(product.price.replace('$', ''))}
              image={product.image}
              quantity={product.quantity}
              color={product.color}
              imageStyle="w-[400px] md:w-[600px] "
              className="w-[300px] md:w-[400px] shrink-0"
            />
          ))}
        </div>

        <div className="items-center gap-2 mt-4 hidden md:flex">
          <Button
            text=""
            leftIcon={SVGS.backward}
            className="bg-[#ebebeb] border h-[20px] w-[60px] items-center justify-center "
          />
          <Button
            text=""
            leftIcon={SVGS.forward}
            className="bg-[#ebebeb] border  h-[20px] w-[60px] flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default NewThisWeek;
