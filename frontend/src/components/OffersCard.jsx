const OfferCard = ({ title, price, features, buttonText, gradientClass }) => (
  <div
    className={`rounded-xl overflow-hidden shadow-lg p-10 ${gradientClass}`}>
    <div className='font-bold text-5xl text-center mb-5 text-white'>{title}</div>
    <p className='text-white font-semibold text-4xl bg-red-500 w-36 rounde-lg py-2 text-center mb-4'>{price}</p>
    <ul className='my-6 font-medium text-[16px] text-white'>
      {features.map((feature, index) => (
        <li
          key={index}
          className='mb-2 list-disc ml-2'>
          {feature}
        </li>
      ))}
    </ul>
    <button className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded mx-auto'>
      {buttonText}
    </button>
  </div>
);

export default OfferCard;
