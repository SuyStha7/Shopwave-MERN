const ShippingDetails = () => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
      <h2 className='text-2xl font-bold mb-4'>Shipping Details</h2>
      <form className='grid grid-cols-1 gap-4'>
        <input
          className='border p-2 rounded'
          type='text'
          placeholder='Full Name'
        />
        <input
          className='border p-2 rounded'
          type='email'
          placeholder='Email Address'
        />
        <input
          className='border p-2 rounded'
          type='text'
          placeholder='Phone Number'
        />
        <input
          className='border p-2 rounded'
          type='text'
          placeholder='Address'
        />
        <input
          className='border p-2 rounded'
          type='text'
          placeholder='City'
        />
        <input
          className='border p-2 rounded'
          type='text'
          placeholder='State'
        />
        <input
          className='border p-2 rounded'
          type='text'
          placeholder='Postal Code'
        />
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='sameAsBilling'
            className='mr-2'
          />
          <label htmlFor='sameAsBilling'>Use this address for billing</label>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
