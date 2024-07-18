
const Contact = () => {
  return (
    <div
      className='contact bg-cover bg-center flex items-center justify-center my-4 p-8'
      id='contact'>
      <form className='contact-container bg-white p-6 rounded-md shadow-md max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl'>
      <h1 className='text-3xl'>Give us your feedback</h1>
        <div className='contact-title mb-4'>
          <h2 className='text-white text-2xl md:text-3xl lg:text-4xl mb-5'>
            Give Us Feedback
          </h2>
          <div className='contact-input space-y-4'>
            <input
              type='text'
              placeholder='Your Name'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
            <br />
            <input
              type='email'
              placeholder='Your email'
              required
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
            <textarea
              name=''
              id=''
              cols='30'
              rows='5'
              placeholder='Your Message'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'></textarea>
          </div>
          <button className='w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
