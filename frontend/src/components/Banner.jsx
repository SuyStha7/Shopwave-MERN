import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Banner = () => {
  const slides = [
    {
      img: "https://i.pinimg.com/736x/23/34/1f/23341f65daa921a20072874cdd1dc360.jpg",
      title: "Oppo Reno Z Purple",
      description:
        "Explore the stylish Oppo Reno Z in purple color. High-quality secondhand mobile phones available.",
    },
    {
      img: "https://pages.am-usercontent.com/images/cb288b51f3c50ba52b9d997484a6143ae9f1f808/image_upload_adf4e4252dc64bbdbdf1e749b70ac011.jpeg",
      title: "Naviforce Watch for Dreams",
      description: "Discover the stylish and durable Naviforce watches.",
    },
    {
      img: "https://cdn2.f-cdn.com/contestentries/1414523/974321/5b9b47a565e42_thumb900.jpg",
      title: "Lenovo V110 Core i3 Laptop",
      description:
        "Experience the best of refurbished Lenovo V110 Core i3 laptops with quality assurance.",
    },
  ];

  return (
    <div className='relative'>
      <Swiper
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        className=' h-80 md:h-[70vh] relative'>
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className='relative flex items-center justify-center bg-cover bg-center'>
            <img
              src={slide.img}
              className='w-full h-full object-fill'
              alt={slide.title}
            />
            <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full text-center'>
              <h2 className='text-lg md:text-2xl font-bold'>{slide.title}</h2>
              <p className='text-sm md:text-lg'>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}

        <div className='swiper-button-next cursor-pointer text-white absolute top-1/2 right-4 transform -translate-y-1/2 z-10'>
          <ChevronRight />
        </div>
        <div className='swiper-button-prev cursor-pointer text-white absolute top-1/2 left-4 transform -translate-y-1/2 z-10'>
          <ChevronLeft />
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
