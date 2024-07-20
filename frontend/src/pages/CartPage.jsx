import { Minus, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  loadCart,
  saveCart,
} from "../store/features/cart/cartSlice.js";
import { toast } from "react-toastify";
import formatNumber from "format-number";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user?.user);

  useEffect(() => {
    if (user && user._id) {
      dispatch(loadCart(user._id));
    } else {
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  const handleChangeQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
    dispatch(
      saveCart({
        userId: user._id,
        cartItems: cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      })
    );
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(
      saveCart({
        userId: user._id,
        cartItems: cartItems.filter((item) => item.productId !== productId),
      })
    );
    toast.info("Item removed from cart successfully", { autoClose: 1000 });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = 100;
  const discountRate = 0.1;
  const discount = subtotal * discountRate;
  const totalAmount = subtotal + deliveryCharge - discount;

  if (!user || !user._id) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        {cartItems.length === 0 ? (
          <div className='flex justify-center items-center h-[80vh] mb-20'>
            <p className='text-3xl text-center flex flex-col gap-5'>
              Your cart is empty <br />
              <Link
                to='/shop'
                className='text-blue-700 text-3xl'>
                <Button
                  variant='outline'
                  className='border border-gray-400'>
                  Continue Shopping
                </Button>
              </Link>
            </p>
          </div>
        ) : (
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full md:w-2/3 flex flex-col gap-3 bg-white rounded-lg shadow-lg p-6'>
              <div className='flex items-center justify-between font-semibold'>
                <h1 className='text-3xl py-5'>Your Cart Items</h1>
                <p className='text-gray-800 text-[18px]'>
                  You have{" "}
                  <span className='text-xl text-blue-400'>
                    {cartItems.length}
                  </span>{" "}
                  items in your cart
                </p>
              </div>
              {cartItems.map((item) => (
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
                      <span className='font-semibold'>
                        {formatNumber()(item.price)}
                      </span>{" "}
                      <span className='text-gray-400 text-[15px]'>
                        NPR/Item
                      </span>
                    </p>
                    <p className='font-semibold text-[16px]'>
                      Total:{" "}
                      <span className='font-semibold'>
                        {formatNumber()(item.price * item.quantity)}
                      </span>{" "}
                      <span className='text-gray-400 text-[15px]'>NPR</span>
                    </p>
                  </div>
                  <div className='flex items-center gap-5'>
                    <button
                      className='px-2 py-1 bg-gray-300 rounded-md'
                      onClick={() =>
                        handleChangeQuantity(item.productId, item.quantity - 1)
                      }>
                      <Minus />
                    </button>
                    <input
                      type='number'
                      className='w-12 text-center mx-2 border rounded-md text-[18px] p-1'
                      readOnly
                      value={item.quantity}
                      min={1}
                    />
                    <button
                      className='px-2 py-1 bg-gray-300 rounded-md'
                      onClick={() =>
                        handleChangeQuantity(item.productId, item.quantity + 1)
                      }>
                      <Plus />
                    </button>
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
              <h1 className='text-[28px] font-semibold text-center'>
                Purchase Details
              </h1>
              <div className='text-lg'>
                <p className='text-gray-700 font-medium'>
                  Please review your cart before proceeding to checkout.
                  Delivery charges and discounts will be applied during
                  checkout.
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <h2 className='font-semibold text-xl'>
                    Subtotal:{" "}
                    <span className='font-semibold'>
                      {formatNumber()(subtotal)}
                    </span>{" "}
                    <span className='text-gray-400 text-lg'>NPR</span>
                  </h2>
                  <h2 className='font-semibold text-xl'>
                    Delivery Charge:{" "}
                    <span className='font-semibold'>
                      {formatNumber()(deliveryCharge)}
                    </span>{" "}
                    <span className='text-gray-400 text-lg'>NPR</span>
                  </h2>
                  <h2 className='font-semibold text-xl'>
                    Discount:{" "}
                    <span className='font-semibold'>
                      {formatNumber()(discount)}
                    </span>{" "}
                    <span className='text-gray-400 text-lg'>NPR</span>{" "}
                    <span className='text-green-600 text-lg'>
                      ({(discountRate * 100).toFixed(2)}%)
                    </span>
                  </h2>
                  <h2 className='font-semibold text-xl'>
                    Total Price:{" "}
                    <span className='font-semibold'>
                      {formatNumber()(totalAmount)}
                    </span>{" "}
                    <span className='text-gray-400 text-lg'>NPR</span>
                  </h2>
                </div>
                <Link
                  to='/checkout'
                  className='bg-blue-400 text-white px-4 py-3 my-5 font-semibold uppercase hover:bg-blue-500 rounded flex items-center justify-center'>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
