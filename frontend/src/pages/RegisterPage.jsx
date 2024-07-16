import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { register } from "../store/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

// Define the validation schema with regex and uniqueness
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      const { ...filteredValues } = values;
      dispatch(register(filteredValues))
        .unwrap()
        .then((res) => {
          if (res?.success === true) {
            resetForm();
            toast.success(res?.message, { autoClose: 1000 });
            setTimeout(() => {
              navigate("/login");
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
          <CardTitle className='text-3xl text-center font-bold'>
            REGISTER
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className='grid gap-4'>
              {/* username */}
              <div className='grid gap-2'>
                <Label
                  htmlFor='username'
                  className='text-[16px] uppercase'>
                  Username
                </Label>
                <Input
                  id='username'
                  required
                  autoComplete='off'
                  name='name'
                  className='focus:border-blue-400'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='text-red-600 text-sm'>
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              {/* email */}
              <div className='grid gap-2'>
                <Label
                  htmlFor='email'
                  className='text-[16px] uppercase'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  required
                  name='email'
                  className='focus:border-blue-400'
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
                <Label
                  htmlFor='password'
                  className='text-[16px] uppercase'>
                  Password
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete='off'
                    name='password'
                    className='focus:border-blue-400'
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

              {/* confirm password */}
              <div className='grid gap-2'>
                <Label
                  htmlFor='confirmPassword'
                  className='text-[16px] uppercase'>
                  Confirm Password
                </Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showCPassword ? "text" : "password"}
                    required
                    autoComplete='off'
                    name='confirmPassword'
                    className='focus:border-blue-400'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.values.confirmPassword && (
                    <span
                      className='absolute inset-y-0 right-1 pr-3 flex items-center text-sm leading-5 cursor-pointer'
                      onClick={() => setShowCPassword(!showCPassword)}>
                      {showCPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className='text-red-600 text-sm'>
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <Button
                type='submit'
                className='bg-blue-400 text-white text-lg px-4 py-6 uppercase hover:bg-blue-500 rounded flex items-center justify-center'
                disabled={status == "loading" ? true : false}>
                {status == "loading" ? "Registering...." : "Register"}
              </Button>
            </div>
          </form>

          <div className='mt-4 text-center text-[16px]'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='underline'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
