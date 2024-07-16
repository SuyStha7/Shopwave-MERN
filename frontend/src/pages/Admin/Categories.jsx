import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "@/store/features/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const initialValue = {
    name: "",
  };

  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(inputValues))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          dispatch(getAllCategories());
          setInputValues(initialValue);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  };

  const handleDelete = (slug) => {
    dispatch(deleteCategory(slug))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          setTimeout(() => {
            dispatch(getAllCategories());
          }, 3000);
          setInputValues(initialValue);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  };

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

  return (
    <div className='h-full p-2'>
      <section>
        <Card className='md:w-[550px] lg:ml-[23%]  shadow-none outline-none'>
          <CardHeader>
            <CardTitle className='text-center'>Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex items-center justify-center gap-2'>
                <Input
                  id='name'
                  type='text'
                  name='name'
                  value={inputValues.name || ""}
                  placeholder='Category Name'
                  onChange={handleChange}
                  className='mr-2 w-[250px]'
                />
                <Button>Add</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className='md:w-full shadow-none outline-none border border-gray-300 rounded-none'>
          <Table>
            <TableHeader className='bg-gray-50'>
              <TableRow>
                <TableHead className='font-bold text-black text-[15px]'>
                  S.N.
                </TableHead>
                <TableHead className='font-bold text-black text-[15px]'>
                  Category Name
                </TableHead>
                <TableHead className='font-bold text-black text-[15px]'>
                  Category Slug
                </TableHead>
                <TableHead className='font-bold text-black text-[15px]'>
                  Created At
                </TableHead>
                <TableHead className='font-bold text-black text-[15px]'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {category &&
                category.categories &&
                category.categories.map((cat, index) => {
                  return (
                    <TableRow key={cat._id}>
                      <TableCell className='text-[15px] font-medium'>
                        {index + 1}
                      </TableCell>
                      <TableCell className='capitalize-two text-[15px] font-medium'>
                        {capitalizeName(cat.name)}
                      </TableCell>
                      <TableCell className='text-[15px] font-medium'>
                        {cat.slug}
                      </TableCell>
                      <TableCell className='text-[15px] font-medium'>
                        {moment(cat.createdAt).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-4 items-center cursor-pointer'>
                          <FaRegEdit
                            onClick={() =>
                              navigate(`/admin/categories/update/${cat.slug}`)
                            }
                            className='w-5 h-5 text-green-800 hover:text-black'
                          />
                          <AiOutlineDelete
                            onClick={() => handleDelete(cat.slug)}
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
  );
};

// Function to capitalize names based on length
const capitalizeName = (name) => {
  return name
    .split(" ")
    .map((word) => {
      if (word.length === 2) {
        return word.toUpperCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join(" ");
};

export default Categories;
