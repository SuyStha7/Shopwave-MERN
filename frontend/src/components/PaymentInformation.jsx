import { useState } from "react";

const PaymentInformation = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!cardNumber.match(/^\d{16}$/)) {
      errors.cardNumber = "Card number must be 16 digits";
    }
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      errors.expiryDate = "Expiry date must be in MM/YY format";
    }
    if (!cvv.match(/^\d{3}$/)) {
      errors.cvv = "CVV must be 3 digits";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      console.log("Proceed to Payment");
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
      <h2 className='text-2xl font-bold mb-4'>Payment Information</h2>
      <form
        className='grid grid-cols-1 gap-4'
        onSubmit={handleSubmit}>
        <div>
          <input
            className='border p-2 rounded w-full'
            type='text'
            placeholder='Card Number'
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {errors.cardNumber && (
            <p className='text-red-500'>{errors.cardNumber}</p>
          )}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <input
              className='border p-2 rounded w-full'
              type='text'
              placeholder='Expiry Date (MM/YY)'
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            {errors.expiryDate && (
              <p className='text-red-500'>{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <input
              className='border p-2 rounded w-full'
              type='text'
              placeholder='CVV'
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            {errors.cvv && <p className='text-red-500'>{errors.cvv}</p>}
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentInformation;
