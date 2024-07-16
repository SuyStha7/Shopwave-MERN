import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import { addProduct } from "@/store/features/products/productSlice";

const AddProduct = () => {
  const initialValue = {
    title: "",
    price: "",
    desc: "",
    category: "",
    picture: null,
  };

  const [inputValues, setInputValues] = useState(initialValue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.categories.categories);
  const productStatus = useSelector((state) => state.products.status);
  const categoryStatus = useSelector((state) => state.categories.status);
  const categoryError = useSelector((state) => state.categories.error);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInputValues((values) => ({ ...values, picture: e.target.files[0] }));
  };

  const handleCategoryChange = (value) => {
    setInputValues((values) => ({ ...values, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in inputValues) {
      formData.append(key, inputValues[key]);
    }

    dispatch(addProduct(formData))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          setTimeout(() => {
            navigate("/admin/products");
          }, 1000);
          setInputValues(initialValue);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 1000 });
      });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (categoryStatus === "loading") {
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

  if (categoryError) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Error while fetching categories</p>
      </div>
    );
  }

  return (
    <div className='h-full p-2'>
      <Card className='md:w-[550px] lg:ml-[23%] shadow-none outline-none mt-12'>
        <CardHeader>
          <CardTitle className='text-center mb-2'>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    type='text'
                    name='title'
                    value={inputValues.title}
                    placeholder='Enter product title'
                    onChange={handleChange}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='category'>Category</Label>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {category &&
                        category.categories &&
                        category.categories.map((cat) => (
                          <SelectItem
                            className='capitalize'
                            key={cat._id}
                            value={cat._id}>
                            {capitalizeName(cat.name)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='price'>Price</Label>
                  <Input
                    id='price'
                    type='number'
                    name='price'
                    value={inputValues.price}
                    placeholder='Enter product price'
                    onChange={handleChange}
                  />
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='picture'>Picture</Label>
                  <Input
                    type='file'
                    id='picture'
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='desc'>Description</Label>
                <Textarea
                  id='desc'
                  className='min-h-32'
                  placeholder='Enter product description'
                  name='desc'
                  value={inputValues.desc}
                  onChange={handleChange}
                />
              </div>

              <Button
                type='submit'
                className='w-full'
                disabled={productStatus === "loading"}>
                {productStatus === "loading"
                  ? "Adding Product..."
                  : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
