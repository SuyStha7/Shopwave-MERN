import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/data";

const CustomerReviews = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FaStar
            key={i}
            className='text-yellow-500'
          />
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className='text-yellow-500'
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className='text-yellow-500'
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white">
    <div className='container mx-auto p-5 px-4 mb-8'>
      <h1 className='title text-3xl mt-8 mb-10 font-bold uppercase text-center text-blue-500'>
        Customers Reviews
      </h1>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 4000 }}
        modules={[Navigation, Autoplay]}
        className='mySwiper'
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}>
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className=' border border-gray-200 bg-gray-50 shadow-lg rounded-md p-5 mb-10 max-w-md mx-auto '>
              <div className='text-gray-800 font-bold text-xl my-2 text-center'>
                {review.product}
              </div>
              <blockquote className='text-gray-600 text-[16px] font-medium mb-4 text-center'>
                {review.text}
              </blockquote>

              <div className='flex items-center justify-around'>
                <div className='flex items-center gap-1'>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className='rounded-full h-12 w-12 object-cover mr-4'
                  />
                  <div>
                    <p className='font-semibold text-black'>{review.name}</p>
                    <p className='text-gray-500'>{review.location}</p>
                  </div>
                </div>

                <div className='flex items-center gap-1 text-lg mb-4'>
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className='swiper-button-next cursor-pointer text-blue-600'>
          <ChevronRight className='w-5 h-5' />
        </div>
        <div className='swiper-button-prev cursor-pointer text-blue-600'>
          <ChevronLeft className='w-5 h-5' />
        </div>
      </Swiper>
    </div>
    </div>
  );
};

export default CustomerReviews;
