import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import formatNumber from "format-number";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.info("Item removed from wishlist successfully", { autoClose: 1000 });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className='flex justify-center items-center h-[80vh] mb-20'>
        <p className='text-3xl text-center flex flex-col gap-5'>
          Your wishlist is empty <br />
          <Link to='/shop' className='text-blue-700 text-3xl'>
            <Button variant='outline' className='border border-gray-400'>
              Continue Shopping
            </Button>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-2/3 flex flex-col gap-3 bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center justify-between font-semibold'>
              <h1 className='text-3xl py-5'>Your Wishlist Items</h1>
              <p className='text-gray-800 text-[18px]'>
                You have{" "}
                <span className='text-xl text-blue-400'>{wishlistItems.length}</span>{" "}
                items in your wishlist
              </p>
            </div>
            {wishlistItems.map((item) => (
              <div
                key={item.productId}
                className='flex flex-col md:flex-row items-center gap-8 border p-6 rounded-lg shadow'>
                <img
                  className='w-32 h-32 object-contain rounded'
                  src={item.pictureUrl}
                  alt={item.title}
                />
                <div className='flex-1 px-4'>
                  <h2 className='text-xl font-semibold mb-3'>{item.title}</h2>
                  <p className='font-semibold text-[16px]'>
                    Price:{" "}
                    <span className='font-semibold'>{formatNumber()(item.price)}</span>{" "}
                    <span className='text-gray-400 text-[15px]'>NPR/Item</span>
                  </p>
                </div>
                <div className='flex items-center gap-5'>
                  <button
                    className='text-red-600 hover:text-red-400 text-2xl'
                    onClick={() => handleRemove(item.productId)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='w-full md:w-1/3 flex flex-col gap-5 bg-white p-6 rounded-lg shadow-lg h-[450px]'>
            <h1 className='text-[28px] font-semibold text-center'>Wishlist Summary</h1>
            <div className='text-lg'>
              <p className='text-gray-700 font-medium'>
                Please review your wishlist items.
              </p>
            </div>
            <Link
              to='/shop'
              className='bg-blue-400 text-white px-4 py-3 my-5 font-semibold uppercase hover:bg-blue-500 rounded flex items-center justify-center'>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
