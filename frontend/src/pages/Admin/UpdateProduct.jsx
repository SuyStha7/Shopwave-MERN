import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import {
  getSingleProduct,
  updateProduct,
} from "@/store/features/products/productSlice";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [prevPic, setPrevPic] = useState("");
  const category = useSelector((state) => state.categories.categories);
  const catStatus = useSelector((state) => state.categories.status);
  const catError = useSelector((state) => state.categories.error);
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);
  const [inputValues, setInputValues] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
    picture: "",
  });

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
    const { name, value, type, files } = e.target;
    setInputValues((values) => ({
      ...values,
      [name]: type === "file" ? files[0] : value,
    }));
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

    dispatch(updateProduct({ formData, productId }))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 2000 });
          setTimeout(() => {
            navigate("/admin/products");
          }, 2000);
        } else {
          toast.error(res?.message, { autoClose: 2000 });
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    dispatch(getAllCategories());
  }, [productId, dispatch]);

  useEffect(() => {
    if (products && products.product) {
      const { title, price, category, picture, desc } = products.product;
      setInputValues({
        title,
        desc,
        price,
        category: category._id,
        picture: picture ? picture.secure_url : "",
      });
      setPrevPic(picture.secure_url);
    }
  }, [products]);

  if (catStatus === "loading" || productStatus === "loading") {
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

  if (catError || productError) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Error while fetching data</p>
      </div>
    );
  }

  return (
    <div className='mb-0'>
      <Card className='md:w-[550px] lg:ml-[23%] shadow-none outline-none'>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            encType='multipart/form-data'
            onSubmit={handleSubmit}>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  type='text'
                  id='title'
                  placeholder='Enter Product Title'
                  name='title'
                  value={inputValues.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-3'>
                  <Label htmlFor='price'>Price</Label>
                  <Input
                    type='text'
                    id='price'
                    placeholder='Enter Product Price'
                    name='price'
                    value={inputValues.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='category'>Category</Label>
                  <Select
                    value={inputValues.category}
                    onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {category &&
                        category.categories &&
                        category.categories.map((cat) => {
                          return (
                            <SelectItem
                              className='capitalize'
                              key={cat._id}
                              value={cat._id}>
                              {capitalizeName(cat.name)}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid gap-4'>
                {prevPic && (
                  <div className='grid gap-3'>
                    <Label>Previous Picture</Label>
                    <img
                      src={prevPic}
                      alt='Previous'
                      className='h-32 w-32 object-cover rounded-md'
                    />
                  </div>
                )}

                <div className='grid gap-3'>
                  <Label htmlFor='picture'>Latest Picture</Label>
                  <Input
                    type='file'
                    id='picture'
                    name='picture'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='desc'>Description</Label>
                <Textarea
                  type='text'
                  id='desc'
                  name='desc'
                  value={inputValues.desc}
                  placeholder='Enter Product Description'
                  onChange={handleChange}
                  className='min-h-32'
                  required
                />
              </div>

              <div className=''>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={productStatus === "loading"}>
                  {productStatus === "loading"
                    ? "Updating Product..."
                    : "Update Product"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProduct;
