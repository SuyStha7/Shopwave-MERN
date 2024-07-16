import { blogs } from "@/data";
import { Calendar, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const startFromIndex = 3; // Start displaying from the 4th item (index 3)
  const itemsPerRow = 4; // Number of items per row
  const [visibleBlogs, setVisibleBlogs] = useState(blogs.slice(startFromIndex, startFromIndex + itemsPerRow)); // Show itemsPerRow items initially
  const [sortBy, setSortBy] = useState(""); // State for sorting option
  const [sortDirection, setSortDirection] = useState("desc"); // State for sort direction

  const loadAmount = 2;

  const handleSortChange = (e) => {
    const option = e.target.value;
    if (option === "date") {
      setSortBy("date");
    } else if (option === "likes") {
      setSortBy("likes");
    } else if (option === "comments") {
      setSortBy("comments");
    }
    toggleSortDirection(); // Toggle sort direction
  };

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    filterBlogs(sortBy, newSortDirection);
  };

  const filterBlogs = (option, direction) => {
    let sortedBlogs = [...blogs];

    if (option === "date") {
      sortedBlogs = sortedBlogs.sort((a, b) =>
        direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );
    } else if (option === "likes") {
      sortedBlogs = sortedBlogs.sort((a, b) =>
        direction === "asc" ? a.likes - b.likes : b.likes - a.likes
      );
    } else if (option === "comments") {
      sortedBlogs = sortedBlogs.sort((a, b) =>
        direction === "asc" ? a.comments - b.comments : b.comments - a.comments
      );
    }

    setVisibleBlogs(sortedBlogs.slice(0, startFromIndex + itemsPerRow));
  };

  const loadMore = () => {
    setVisibleBlogs((prevVisible) => {
      const nextBatch = blogs.slice(prevVisible.length, prevVisible.length + loadAmount);
      return [...prevVisible, ...nextBatch];
    });
  };

  const loadLess = () => {
    setVisibleBlogs((prevVisible) => {
      const newVisible = prevVisible.slice(0, Math.max(itemsPerRow, prevVisible.length - loadAmount));
      return newVisible;
    });
  };

  return (
    <div className='m-h-screen bg-gray-100 py-2'>
      <div className='container p-4 mt-2'>
        <div className='flex justify-between mb-4'>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className='border p-2 rounded'>
            <option value=''>Sort By</option>
            <option value='date'>Date Added</option>
            <option value='likes'>Likes</option>
            <option value='comments'>Comments</option>
          </select>
          {sortBy && (
            <button
              onClick={toggleSortDirection}
              className='ml-2 px-3 py-1 bg-blue-500 text-white rounded'>
              {sortDirection === "asc" ? "Ascending" : "Descending"}
            </button>
          )}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              className='bg-white border border-gray-200 p-6 rounded-lg shadow-md flex gap-10 w-full'>
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
        <div className='flex items-center justify-center gap-5 mt-8'>
          {visibleBlogs.length < blogs.length && (
            <button
              onClick={loadMore}
              className='bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-4 uppercase rounded'>
              Load More
            </button>
          )}

          {visibleBlogs.length > itemsPerRow && (
            <button
              onClick={loadLess}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 uppercase rounded'>
              Load Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
