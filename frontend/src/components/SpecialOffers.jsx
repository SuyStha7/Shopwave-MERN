const SpecialOffers = () => {
  return (
    <div className='bg-white mt-12'>
      <div className='relative'>
        <img
          src='/specialOffers.jpg' // Replace with your image path
          alt='banner'
          className='w-full h-[600px] object-fill'
        />
        <div className='absolute inset-0 flex items-center justify-center text-white mx-24'>
          <h1 className='text-xl md:text-5xl font-bold text-center leading-6'>
            Get 15% off all models of the iPhone 13 and enjoy a 20% discount on
            the Samsung Galaxy S21 series.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
