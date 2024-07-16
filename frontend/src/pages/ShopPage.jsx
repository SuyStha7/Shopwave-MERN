import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../store/features/products/productSlice";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const ShopPage = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const { products, status, error } = productsData;

  const initialStartIndex = 4; // Start displaying from the 4th item (index 3)
  const initialVisibleProducts = 8; // Initial number of products to display
  const [visibleProducts, setVisibleProducts] = useState(
    initialVisibleProducts
  ); // Show 8 items initially
  const [sortBy, setSortBy] = useState(""); // State for sorting method
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const loadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 4); // Increase by 4 items
  };

  const loadLess = () => {
    setVisibleProducts(initialVisibleProducts); // Show initialVisibleProducts products
  };

  const sortByPriceAsc = () => {
    setSortBy("price");
    setSortOrder("asc");
  };

  const sortByPriceDesc = () => {
    setSortBy("price");
    setSortOrder("desc");
  };

  const sortedProducts = () => {
    if (!products || !products.products) return []; // Handle initial loading state
    let sorted = [...products.products];
    if (sortBy === "price") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (sortOrder === "asc") {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
    }
    return sorted;
  };

  if (status === "loading") {
    return (
      <div className='flex justify-center items-center h-screen'>
        <TailSpin
          visible={true}
          height={100}
          width={100}
          color='#000'
          ariaLabel='tail-spin-loading'
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Error while fetching: {error}</p>
      </div>
    );
  }

  return (
    <div className='m-h-screen bg-gray-100 py-2'>
      <div className='container p-4 mt-2'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <select
              onChange={(e) => {
                if (e.target.value === "price-asc") {
                  sortByPriceAsc();
                } else if (e.target.value === "price-desc") {
                  sortByPriceDesc();
                }
              }}
              className='p-2 border border-gray-300 rounded mr-2'>
              <option value=''>Sort by</option>
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {sortedProducts()
            .slice(initialStartIndex, initialStartIndex + visibleProducts)
            .map((prod) => (
              <div key={prod._id}>
                <ProductCard prod={prod} />
              </div>
            ))}
        </div>
        {products.products &&
          products.products.length >
            initialStartIndex + initialVisibleProducts && (
            <div className='flex justify-center my-8'>
              {visibleProducts > initialVisibleProducts ? (
                <button
                  onClick={loadLess}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 uppercase rounded'>
                  Load Less
                </button>
              ) : (
                <button
                  onClick={loadMore}
                  className='bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-4 uppercase rounded'>
                  Load More
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default ShopPage;
