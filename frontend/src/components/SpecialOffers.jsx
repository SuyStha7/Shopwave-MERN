

const SpecialOffers = () => {
  return (
    <div className='bg-white mt-12'>
      <div className='relative'>
        <img
          src='/specialOffers.jpg' // Replace with your image path
          alt='banner'
          className='w-full h-[480px] object-fill'
        />
        <div className='absolute inset-0 flex items-center justify-center text-white'>
          <h1 className='text-4xl md:text-6xl font-bold text-center'>
            Special Offers
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
