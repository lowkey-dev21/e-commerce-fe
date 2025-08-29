import product1 from "../../assets/images/product1.png";
import product9 from "../../assets/images/product9.png";
import product10 from "../../assets/images/product10.png";
import product11 from "../../assets/images/product11.png";

const Feature = () => {
  return (
    <section className="text-center  md:px-10 px-6 ">
      <h1 className="lg:text-5xl text-3xl nd:text-5xl- text-[#272727]  ">
        OUR APPROACH TO FASHION DESIGN
      </h1>
      <div className="md:w-[50%] mx-auto text-[#272727]/70 mt-7">
        at elegant vogue , we blend creativity with craftsmanship to create
        fashion that transcends trends and stands the test of time each design
        is meticulously crafted, ensuring the highest quelity exqulsite finish
      </div>
      <div className="mt-7 flex flex-wrap justify-center   gap-8">
        <div className="flex items-center md:translate-y-0">
          <img className="w-[300px] h-[350px]" src={product1} alt="feature" />
        </div>
        <div className="flex items-center md:translate-y-12">
          <img className="w-[300px] h-[350px]" src={product9} alt="feature" />
        </div>
        <div className="flex items-center md:translate-y-0">
          <img className="w-[300px] h-[350px]" src={product10} alt="feature" />
        </div>
        <div className="flex items-center md:translate-y-12">
          <img className="w-[300px] h-[350px]" src={product11} alt="feature" />
        </div>
      </div>
    </section>
  );
};
export default Feature;
