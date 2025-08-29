import Collections from "../../components/home/Collections";
import Feature from "../../components/home/Feature";
import Footer from "../../components/home/Footer";
import Hero from "../../components/home/Hero";
import NewThisWeek from "../../components/home/NewThisWeek";

const Home = () => {
  return(
    <section className=" w-full flex flex-col gap-[8rem] " >
      <Hero />
      <NewThisWeek/>
      <Collections/>
      <Feature/>
      <Footer/>
    </section>
  )
};
export default Home;
