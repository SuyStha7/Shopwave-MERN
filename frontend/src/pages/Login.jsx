import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/auth/authSlice.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

// Define the validation schema with regex
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must be minimum 8 characters, at least one letter and one number"
    ),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true, // Enable validation on change
    validateOnBlur: true, // Enable validation on blur
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      dispatch(login(values))
        .unwrap()
        .then((res) => {
          if (res?.success === true) {
            resetForm();
            toast.success(res?.message, { autoClose: 1000 });
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            toast.error(res?.message, { autoClose: 1000 });
          }
        })
        .catch((err) => {
          toast.error(err, { autoClose: 1000 });
        });
    },
  });

  return (
    <div className='h-screen flex justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl text-center font-bold'>
            LOGIN
          </CardTitle>

          <CardDescription className='text-center text-[15px] font-semibold'>
            Login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className='grid gap-4'>
              {/* email */}
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  required
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-red-600 text-sm'>
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* password */}
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete='off'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.values.password && (
                    <span
                      className='absolute inset-y-0 right-1 pr-3 flex items-center text-sm leading-5 cursor-pointer'
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-red-600 text-sm'>
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <Button
                type='submit'
                className='w-full'
                disabled={status == "loading" ? true : false}>
                {status == "loading" ? "Signing in...." : "Sign in"}
              </Button>
            </div>
          </form>

          <div className='mt-4 text-center text-sm'>
            Don't have an account?{" "}
            <Link
              to='/register'
              className='underline'>
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
