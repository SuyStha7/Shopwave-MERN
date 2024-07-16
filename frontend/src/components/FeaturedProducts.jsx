import { useSelector, useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { getAllProducts } from "../store/features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className='flex justify-center items-center h-screen py-12'>
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
      <div className='flex justify-center items-center h-screen'>
        <p>Error while fetching</p>
      </div>
    );
  }

  return (
    <div className='container p-5'>
      <h1 className='title text-3xl mt-8 mb-10 font-bold uppercase text-center text-blue-500'>
        Featured Products
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {product &&
          product.products &&
          product.products.slice(0, 4).map((prod) => (
            <div key={prod._id}>
              <ProductCard prod={prod} />
            </div>
          ))}
      </div>
      <div className='text-center mt-8'>
        <Link
          to='/shop'
          className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 my-10 uppercase rounded'>
          View More
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
