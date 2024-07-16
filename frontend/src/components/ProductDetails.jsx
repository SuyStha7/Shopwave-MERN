import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/store/features/cart/cartSlice";
import { getSingleProduct } from "@/store/features/products/productSlice";
import formatNumber from "format-number";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    category: "",
    picture: "",
    desc: "",
  });
  const dispatch = useDispatch();
  const { productId } = useParams();

  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  //Check if user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.user);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = () => {
    // Check if user is authenticated before allowing addition to cart
    if (!isAuthenticated) {
      toast.error("Please log in to add items to the cart", {
        autoClose: 1000,
      });
      return;
    }

    dispatch(
      addToCart({
        productId,
        title: productDetails.title,
        price: productDetails.price,
        pictureUrl: pictureUrl,
        quantity,
      })
    );
    toast.success("Item added to cart successfully", { autoClose: 1000 });
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (products && products.product) {
      setProductDetails(products.product);
    }
  }, [products]);

  const { title, price, category, picture, desc } = productDetails;
  const pictureUrl = picture?.secure_url || "";
  const categoryName = category?.name || "";

  if (status === "loading") {
    return (
      <div className='flex justify-center items-center h-screen'>
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
      <div className='flex justify-center items-center h-screen'>
        <p>Error while fetching</p>
      </div>
    );
  }

  return (
    <div className='container py-5 mt-10 mb-40 px-4 lg:px-0'>
      <div className='flex flex-col lg:flex-row py-5'>
        <div className='w-full lg:w-1/2 left-portion'>
          <img
            src={pictureUrl}
            alt={productDetails.picture.title}
            className='h-[400px] mx-auto object-contain'
          />
        </div>

        <div className='w-full lg:w-1/2 right-portion mt-10 ml-24 lg:ml-0'>
          <h2 className='text-3xl lg:text-4xl mb-5 font-semibold'>{title}</h2>
          <p className='mb-5 text-[16px] lg:text-[18px] pr-56'>{desc}</p>

          <div className='flex items-center gap-8 mb-2'>
            <p className='capitalize text-lg lg:text-xl font-semibold'>
              Price:{" "}
              <span className='font-semibold'>{formatNumber()(price)}</span>{" "}
              <span className='text-gray-400 text-[16px]'>NPR/Item</span>
            </p>

            <p className='capitalize text-lg lg:text-xl font-semibold'>
              Category: <span>{categoryName}</span>
            </p>
          </div>

          <div className='my-2 flex items-center gap-8'>
            <div className='flex gap-2'>
              <button
                className='px-2 py-1 bg-gray-300 rounded-md'
                onClick={handleDecrement}>
                <Minus />
              </button>
              <input
                type='number'
                className='w-12 text-center mx-2 border rounded-md text-[18px] p-1'
                readOnly
                value={quantity}
                min={1}
              />
              <button
                className='px-2 py-1 bg-gray-300 rounded-md'
                onClick={handleIncrement}>
                <Plus />
              </button>
            </div>

            <div className='my-5'>
              <Button
                className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-4 uppercase rounded w-36'
                onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
