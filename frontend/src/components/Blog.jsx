import { blogs } from "@/data";
import { Calendar, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className='bg-white'>
      <div className='m-h-screen py-1'>
        <div className='container mx-auto py-5'>
          <h1 className='title text-3xl mt-8 mb-10 font-bold uppercase text-center text-blue-500'>
            Latest Blogs
          </h1>

          <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-6'>
            {" "}
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                className='bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-md flex gap-10 w-full'>
                <div>
                  <div className='flex items-center gap-2 font-medium ml-4'>
                    <Calendar />
                    <div>{blog.date}</div>
                  </div>

                  <img
                    src={blog.image}
                    alt={blog.name}
                    className='h-64 object-contain mt-8 w-full rounded-lg'
                  />
                  <div className='p-4'>
                    <h3 className='text-gray-800 font-bold text-2xl my-4'>
                      {blog.name}
                    </h3>
                    <p className='text-gray-600 text-[16px] font-medium'>
                      {blog.description}
                    </p>
                  </div>

                  <div className='flex items-center justify-between font-medium'>
                    <Link
                      to='/blog-detail'
                      className='ml-4 text-gray-600 cursor-pointer hover:underline transition-all ease-in duration-500'>
                      Read more...
                    </Link>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center gap-1 font-medium'>
                        <Heart />
                        <div>{blog.likes}</div>
                      </div>
                      <div className='flex items-center gap-1 font-medium'>
                        <MessageCircle />
                        <div>{blog.comments}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='text-center mt-8'>
            <Link
              to='/blog'
              className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 my-10 uppercase rounded'>
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
