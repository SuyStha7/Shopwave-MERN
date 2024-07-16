import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { catImages } from "@/data"; // Ensure this import is correct

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
      <div className='flex justify-center items-center h-full py-12'>
        <TailSpin
          visible={true}
          height='50'
          width='50'
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
    <div className='bg-gray-50'>
      <div className='container py-6'>
        <Swiper
          slidesPerView={1}
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
            category.categories.map((cat) => {
              const catImage = catImages.find((img) => img.id === cat._id);

              return (
                <SwiperSlide key={cat._id}>
                  <Link to={`/category/${cat._id}`}>
                    <div className='relative border border-gray-200 bg-white rounded-full shadow-md w-20 h-20 flex items-center justify-center overflow-hidden group mb-2'>
                      {catImage && (
                        <img
                          src={catImage.image}
                          alt={capitalizeTwoLetterWords(cat.name)}
                          className='w-full h-full object-cover'
                        />
                      )}
                      {/* Overlay text */}
                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-500 bg-opacity-50'>
                        <p className='text-white text-sm text-center'>
                          {capitalizeTwoLetterWords(cat.name)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
