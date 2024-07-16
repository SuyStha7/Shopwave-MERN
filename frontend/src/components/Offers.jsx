import OfferCard from "./OffersCard";

const Offers = () => {
  const basicFeatures = [
    "Entry-level specifications",
    "Core functionalities",
    "Basic warranty options",
    "Essential accessories included",
  ];
  const standardFeatures = [
    "Enhanced specifications ",
    "Additional features or capabilities",
    "Extended warranty options",
    "Upgraded accessories or peripherals",
  ];
  const premiumFeatures = [
    "Top-of-the-line specifications ",
    "Advanced features",
    "Comprehensive warranty coverage",
    "Premium accessories",
  ];

  return (
    <div
      className='container mx-auto pb-10'>
      <h1 className='title text-3xl mt-8 mb-10 font-bold uppercase text-center text-blue-500'>
        Exclusive Offers
      </h1>
      <div className='flex flex-wrap justify-center gap-8'>
        <OfferCard
          title='Basic'
          price='Rs.99'
          features={basicFeatures}
          buttonText='Buy Basic'
          gradientClass='bg-gradient-to-r from-green-400 to-blue-500'
        />
        <OfferCard
          title='Standard'
          price='Rs.899'
          features={standardFeatures}
          buttonText='Buy Standard'
          gradientClass='bg-gradient-to-r from-yellow-400 to-orange-500'
        />
        <OfferCard
          title='Premium'
          price='Rs.1299'
          features={premiumFeatures}
          buttonText='Buy Premium'
          gradientClass='bg-gradient-to-r from-purple-400 to-pink-500'
        />
      </div>
    </div>
  );
};

export default Offers;
