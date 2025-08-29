import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";
import { SVGS } from "../../constants/home";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ProductCard from "../ui/ProductCard";


interface ProductsI {
    name: string;
    image: string;
    type: string;
    price: string;
    id: string
}

const Hero = () => {

    const products: ProductsI[] = [
        {
            name: "Oversized Shirt",
            image: product1,
            type: "Lightweight and breathable",
            price: "$79",
            id: "1"
        },
        {
            name: "Vintage Jacket",
            image: product2,
            type: "Distressed denim, classic fit",
            price: "$129",
            id: "2"
        },
        {
            name: "Striped  Tee",
            image: product3,
            type: "Soft cotton, comfortable style",
            price: "$39",  
            id: "3"
        },
        {
            name: "Floral Dress",
            image: product4,  // Reusing product3 image for demonstration
            type: "Flowy maxi dress, perfect for summer",
            price: "$99",
            id: "4"
        }
    ]


  return (
    <section className="w-full md:h-[700px] mt-[6rem] md:flex  items-center md:px-10 px-6 ">
      <div className="md:w-3/6 flex flex-col ">
        <div className="text-2xl flex flex-col text-[#272727]/70  items-start justify-start ">
          {/* categories */}
          <button className=" hover:underline">MEN</button>
          <button className=" hover:underline">WOMEN</button>
          <button className=" hover:underline">KIDS</button>
        </div>

        {/* search input */}
        <Input
          placeholder="Search"
          type="text"
          className="md:w-4/5 w-full text-end mt-4"
          icon={SVGS.search}
        />

        <h1 className="text-5xl md:text-6xl md:mt-[6rem] mt-[3rem] font-bold">
          NEW <br /> COLLECTION
        </h1>

        <h4 className="text-[#272727]/70  mt-[1rem] ">
          Summer
          <br />
          2025
        </h4>

        <Button
          text="Go To Shop"
          className="font-medium  hidden md:flex w-4/5 mt-[10.5rem]"
          rightIcon={SVGS.arrowFront}
        />
      </div>

      {/*Product section*/}
      <main className="md:w-full mt-[6rem] flex-col md:flex-row md:mt-0 md:h-[700px] md:mb-0 mb-[3rem] flex md:items-end md:justify-start">
        {/*Desktop Hero Product view */}
        <div className="hidden md:flex  w-full justify-between items-center gap-[2rem]  ">
          <ProductCard image={product1} imageStyle="w-[500px] object-cover " />
          <ProductCard image={product2} imageStyle="w-[500px] object-cover " />
        </div>

        {/*For mobile*/}
        <div className="flex md:hidden gap-3 pb-6 overflow-x-auto">
          {products.map(product => (
            <ProductCard
              key={product.id}
              type={product.type}
              name={product.name}
              price={product.price}
              image={product.image}
              imageStyle="w-[400px] "
              className="w-[300px] shrink-0"
            />
          ))}
        </div>

        <Button
          text="Go To Shop"
          className=" font-medium md:hidden flex w-3/5 mt-[1rem]"
          rightIcon={SVGS.arrowFront}
        />
      </main>
    </section>
  );
};
export default Hero;
