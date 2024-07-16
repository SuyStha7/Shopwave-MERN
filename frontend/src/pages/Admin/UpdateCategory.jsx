import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCategory,
  updateCategory,
} from "@/store/features/categories/categoriesSlice";

const UpdateCategory = () => {
  const [catName, setCatName] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { slug } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ name: catName, slug }))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          navigate("/admin/categories");
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  };

  useEffect(() => {
    dispatch(getSingleCategory(slug))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          setCatName(res.category?.name);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  }, [dispatch, slug]);

  return (
    <>
      <section className='h-full p-2'>
        <Card className='w-[550px] lg:ml-[20%] shadow-none outline-none'>
          <CardHeader>
            <CardTitle className="text-center">Update Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex items-center justify-center gap-2'>
                <Input
                  type='text'
                  name='name'
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className='mr-2 w-[250px]'
                />
                <Button>Update</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default UpdateCategory;
