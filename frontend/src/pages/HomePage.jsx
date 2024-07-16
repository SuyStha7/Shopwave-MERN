import FeaturedProducts from "../components/FeaturedProducts";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Testimonial from "@/components/Testimonial";
import Newsletter from "@/components/Newsletter";
import Blog from "@/components/Blog";
import Offers from "@/components/Offers";
import SpecialOffers from "@/components/SpecialOffers";

const HomePage = () => {
  return (
    <div className='m-h-screen bg-gray-100 pb-10'>
      <Category />
      <Banner />
      <FeaturedProducts />
      <SpecialOffers />
      <Testimonial />
      <Offers />
      <Blog />
      <Newsletter />
    </div>
  );
};

export default HomePage;
