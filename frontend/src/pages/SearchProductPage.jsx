import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { searchProduct } from "@/store/features/products/productSlice";

const SearchProductPage = () => {
  const dispatch = useDispatch();
  const query = useLocation().search;
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(searchProduct(query));
  }, [dispatch, query]);

  return (
    <div className="container mx-auto p-4">
      {status === "loading" && <p className="text-lg text-center">Loading ...</p>}

      <p className="text-lg font-semibold my-3">
        Search Results : {products.length}
      </p>

      {status === "idle" && products.length === 0 && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {status === "succeeded" && products.length !== 0 && (
        <ProductCard data={products} />
      )}

      {status === "failed" && (
        <p className="bg-red-200 text-red-800 text-lg text-center p-4">
          Failed to fetch data. Please try again later.
        </p>
      )}
    </div>
  );
};

export default SearchProductPage;
