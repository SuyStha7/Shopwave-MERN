import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Eye, Fullscreen } from "lucide-react";

const ProductCard = ({ prod }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 2,
    }).format(num);
  };

  if (!prod) {
    return null;
  }

  return (
    <div
      className='border rounded-lg shadow-md relative cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className='rounded-lg w-full'>
        <CardContent className='grid gap-3'>
          {prod.picture && (
            <img
              src={prod.picture.secure_url}
              alt={prod.title}
              className='px-12 py-2 rounded-t-lg h-60 mx-auto object-contain'
            />
          )}
          <div className='text-center'>
            <h5 className='text-[20px] font-semibold tracking-light text-gray-900'>
              {prod.title}
            </h5>
          </div>
        </CardContent>
      </Card>

      {isHovered && (
        <div className='absolute top-2 right-2 flex flex-col gap-20'>
          <div
            onClick={handleOpenModal}
            className='py-2 px-4 text-blue-400 rounded-full cursor-pointer hover:text-blue-500'
            title='Quick View'
          >
            <Fullscreen size={30} />
          </div>

          <Link to={`/product/${prod._id}`}>
            <div
              className='py-2 px-4 text-blue-400 rounded-full cursor-pointer hover:text-blue-500'
              title='View Product'
            >
              <Eye size={30} />
            </div>
          </Link>
        </div>
      )}

      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>{prod.title}</h2>
              <button
                onClick={handleCloseModal}
                className='text-2xl font-semibold'
              >
                &times;
              </button>
            </div>
            {prod.picture && (
              <img
                src={prod.picture.secure_url}
                alt={prod.title}
                className='w-full h-64 object-contain mb-2'
              />
            )}
            <p className='text-gray-800 mt-2 text-[16px]'>{prod.desc}</p>
            <p className='text-gray-600 mt-3 font-semibold text-lg'>
              {formatCurrency(prod.price)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
