import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteProduct,
  getAllProducts,
} from "@/store/features/products/productSlice";
import formatNumber from "format-number";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          setTimeout(() => {
            dispatch(getAllProducts());
          }, 2000);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  };

  useEffect(() => {
    dispatch(getAllProducts());
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

  return (
    <>
      <div className='h-full p-2'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Products Details</h1>
          <Link to='/admin/products/add'>
            <Button>Add Product</Button>
          </Link>
        </div>

        <div className='mt-12'>
          <section>
            <Card className='md:w-full shadow-none outline-none border border-gray-300 rounded-none'>
              <Table>
                <TableHeader className='bg-gray-50'>
                  <TableRow>
                    <TableHead className='font-bold text-black text-[14px]'>
                      S.N.
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Image
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Title
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Description
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Price
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Category
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Added by
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Date
                    </TableHead>
                    <TableHead className='font-bold text-black text-[14px]'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {product &&
                    product.products &&
                    product.products.map((prod, index) => {
                      return (
                        <TableRow key={prod._id}>
                          <TableCell className='text-[15px] font-medium'>
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <img
                              src={prod.picture.secure_url}
                              alt={prod.title}
                              className='aspect-square rounded-sm object-cover'
                              height='64'
                              width='64'
                            />
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {prod.title}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {prod.desc}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {formatNumber({ prefix: "Rs." })(prod.price)}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {prod.category.name}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {prod.user.name}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {moment(prod.createdAt).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell>
                            <div className='flex gap-4 items-center cursor-pointer'>
                              <FaRegEdit
                                onClick={() =>
                                  navigate(`/admin/products/update/${prod._id}`)
                                }
                                className='w-5 h-5 text-green-800 hover:text-black'
                              />
                              <AiOutlineDelete
                                onClick={() => handleDelete(prod._id)}
                                className='w-5 h-5 text-red-800 hover:text-black'
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};

export default Products;
