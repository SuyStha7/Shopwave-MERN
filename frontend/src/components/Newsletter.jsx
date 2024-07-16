import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your newsletter subscription logic
    console.log(`Subscribing ${email} to the newsletter...`);
    setEmail("");
  };

  return (
    <div className=' py-12 mt-10'>
      <div className='w-[700px] mx-auto p-10 border shadow-md rounded-md bg-white'>
        <h2 className='text-3xl font-semibold mb-5 text-center uppercase'>
          Subscribe to our newsletter
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center border-b-2 border-blue-400 py-2'>
            <input
              type='email'
              className='appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight text-lg focus:outline-none'
              placeholder='Your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className='flex bg-blue-400 hover:bg-blue-500 border-blue-400 hover:border-blue-500 text-lg border-4 text-white py-1 px-4 uppercase font-semibold rounded'
              type='submit'>
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
