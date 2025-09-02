import { useState } from "react";
import Product1 from "../../assets/images/product1.png";
import Product2 from "../../assets/images/product2.png";
import Product3 from "../../assets/images/product3.png";
import Product4 from "../../assets/images/product4.png";
import Product5 from "../../assets/images/product5.png";
import Product6 from "../../assets/images/product6.png";
import Product7 from "../../assets/images/product7.png";
import Product8 from "../../assets/images/product8.png";
import ProductCard from "../ui/ProductCard";
import { SVGS } from "../../constants/home";

type Tab = "ALL" | "MEN" | "WOMEN" | "KID";

interface ProductsI {
  name: string;
  type: string;
  price: string;
  quantity?: number;
  color?: string;
  image: string;
  category?: string;
  id: string;
}

function Collections() {
  const [tab, setTab] = useState<Tab>("ALL");
  const products: ProductsI[] = [
    {
      name: "Embroidered Seersucker",
      type: "V-Neck T-Shirt",
      price: "$99",
      color: "white",
      image: Product1,
      quantity: 1,
      category: "Men",
      id: "1",
    },
    {
      name: "Basic SLime FIt T-Shirt",
      type: "Cotton T-Shirt",
      price: "$40",
      image: Product2,
      quantity: 5,
      color: "#A3A3A3",
      category: "Women",
      id: "2",
    },
    {
      name: "Basic Print FIt T-Shirt",
      type: "Henley T-Shirt",
      id: "3",
      price: "$40",
      image: Product3,
      quantity: 3,
      color: "#A3A3A3",
      category: "Kid",
    },
    {
      name: "Full Sleeve Zipper",
      type: "Crewneck T-Shirt",
      id: "4",
      price: "$40",
      image: Product4,
      quantity: 5,
      color: "#000E8A",
      category: "Men",
    },
    {
      name: "Embroidered Seersucker",
      type: "V-Neck T-Shirt",
      price: "$99",
      color: "white",
      image: Product5,
      quantity: 1,
      category: "Women",
      id: "5",
    },
    {
      name: "Basic SLime FIt T-Shirt",
      type: "Cotton T-Shirt",
      price: "$40",
      image: Product6,
      quantity: 5,
      color: "#A3A3A3",
      category: "Kid",
      id: "6",
    },
    {
      name: "Basic Print FIt T-Shirt",
      type: "Henley T-Shirt",
      id: "7",
      price: "$40",
      image: Product7,
      quantity: 3,
      color: "#A3A3A3",
      category: "Men",
    },
    {
      name: "Full Sleeve Zipper",
      type: "Crewneck T-Shirt",
      id: "8",
      price: "$40",
      image: Product8,
      quantity: 5,
      color: "#000E8A",
      category: "Women",
    },
  ];
  return (
    <section className="w-full flex flex-col md:px-10 px-6  ">
      <div className="flex mb-[3rem] items-center w-[400px] justify-between">
        <h1 className="font-bold md:text-6xl text-5xl">
          XIV <br />
          COLLECTIONS <br />
          23-24
        </h1>
      </div>

      {/* tabs */}
      <div className="mb-7">
        <div className="flex items-center gap-4 mb-4">
          {(["ALL", "MEN", "WOMEN", "KID"] as Tab[]).map(tabName => (
            <button
              key={tabName}
              onClick={() => setTab(tabName)}
              className={`${
                tab === tabName
                  ? "text-[#272727] font-medium"
                  : "text-[#272727]/70"
              }`}
            >
              {tabName}
            </button>
          ))}
        </div>
        <hr className="border-[#272727]/20" />
      </div>

      {/* ALL */}
      {tab === "ALL" && (
        <div className="flex w-full  gap-3 pb-6 overflow-x-auto">
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
      )}

      {/* MEN */}
      {tab === "MEN" && (
        <div className="flex w-full  gap-3 pb-6 overflow-x-auto">
          {products
            .filter(product => product.category === "Men")
            .map(product => (
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
      )}

      {/* WOMEN */}
      {tab === "WOMEN" && (
        <div className="flex w-full  gap-3 pb-6 overflow-x-auto">
          {products
            .filter(product => product.category === "Women")
            .map(product => (
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
                addToCart
              />
            ))}
        </div>
      )}

      {/* KIDS */}
      {tab === "KID" && (
        <div className="flex w-full  gap-3 pb-6 overflow-x-auto">
          {products
            .filter(product => product.category === "Kid")
            .map(product => (
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
                addToCart
              />
            ))}
        </div>
      )}
      <div className="items-center gap-2 md:mt-4  mx-auto flex">
        <div className="flex items-center flex-col">
          <button className="text-[#272727]/70 text-xl">More</button>
          <span className="rotate-90">{SVGS.forward}</span>
        </div>
      </div>
    </section>
  );
}
export default Collections;
