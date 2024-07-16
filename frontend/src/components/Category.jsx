import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className='flex justify-center items-center h-full'>
        <TailSpin
          visible={true}
          height='100'
          width='100'
          color='#000'
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </div>
    );
  }

  if (error === "error") {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Error while fetching</p>
      </div>
    );
  }

  // Function to capitalize two-letter words
  const capitalizeTwoLetterWords = (name) => {
    return name.replace(/\b[a-z]{2}\b/g, (word) => {
      return word.toUpperCase();
    });
  };

  return (
    <div className='bg-white'>
      <div className='container py-6 '>
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
          className='mySwiper'>
          {category &&
            category.categories &&
            category.categories.map((cat) => (
              <SwiperSlide key={cat._id}>
                <Link to={`/category/${cat._id}`}>
                  <div className='border border-gray-300 rounded-full w-28 h-28 flex flex-col items-center justify-center'>
                    <div className='p-4'></div>
                    <h2 className='text-lg font-semibold capitalize text-black text-center'>
                      {capitalizeTwoLetterWords(cat.name)}
                    </h2>
                  </div>
                </Link>
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

export default Category;
