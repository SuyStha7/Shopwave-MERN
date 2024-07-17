import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.auth.user?.user);
  return (
    <footer className='bg-blue-400 text-white font-medium py-8'>
      <div className='container mx-auto px-8'>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/4 mb-6 md:mb-0'>
            <h2 className='text-xl font-bold mb-4'>Company</h2>
            <ul>
              <li className='mb-2'>
                <Link
                  to='/'
                  className='hover:underline'>
                  Home
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to='/shop'
                  className='hover:underline'>
                  Shop
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to='/blog'
                  className='hover:underline'>
                  Blog
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to='/contact'
                  className='hover:underline'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className='w-full md:w-1/4 mb-6 md:mb-0'>
            <h2 className='text-xl font-bold mb-4'>Customer Service</h2>
            <ul>
              <li className='mb-2'>
                {user?.role === 1 ? (
                  <Link
                    to='/admin'
                    className='hover:underline'>
                    My Account
                  </Link>
                ) : (
                  <Link
                    to='/profile'
                    className='hover:underline'>
                    My Account
                  </Link>
                )}
              </li>
              <li className='mb-2'>
                <Link
                  to='/orders'
                  className='hover:underline'>
                  Orders
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to='/contact'
                  className='hover:underline'>
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className='w-full md:w-1/4 mb-6 md:mb-0'>
            <h2 className='text-xl font-bold mb-4'>Contact Us</h2>
            <ul>
              <li className='mb-2'>Email: shopwave@gmail.com</li>
              <li className='mb-2'>Phone: 01-4431290</li>
              <li className='mb-2'>Address: Kalanki, Kathmandu</li>
            </ul>
          </div>

          <div className='w-full md:w-1/4'>
            <h2 className='text-xl font-bold mb-4'>Follow Us</h2>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-400'>
                <FaFacebook size={24} />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-400'>
                <FaInstagram size={24} />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-400'>
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-4 text-center'>
          <p>
            &copy; {new Date().getFullYear()} TechBazzar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
