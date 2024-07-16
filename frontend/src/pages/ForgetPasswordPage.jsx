import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetEmail } from "../store/features/auth/authSlice.js";
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
});

const ForgetPasswordPage = () => {
  const { status, error } = useSelector((state) => state.auth); // Assuming authSlice is correctly configured in Redux
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(sendPasswordResetEmail(values.email))
        .unwrap()
        .then((response) => {
          toast.success(response.message || "Reset email sent successfully", {
            autoClose: 1000,
          });
        })
        .catch((error) => {
          toast.error(error.message || "Failed to send reset email.", {
            autoClose: 1000,
          });
        });
    },
  });

  return (
    <div className='h-[90vh] flex justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-3xl text-center font-bold'>
            FORGET PASSWORD
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className='grid gap-4'>
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
                  autoComplete='on'
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

              <Button
                type='submit'
                className='bg-blue-400 text-white text-lg px-4 py-6 uppercase hover:bg-blue-500 rounded flex items-center justify-center'
                disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>

          {error && (
            <div className='mt-4 text-center text-red-600'>{error}</div>
          )}

          <div className='mt-4 text-center text-[16px]'>
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

export default ForgetPasswordPage;
