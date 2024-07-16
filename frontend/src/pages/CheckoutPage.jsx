import OrderSummary from "@/components/OrderSummary";
import PaymentInformation from "@/components/PaymentInformation";
import ShippingDetails from "@/components/ShippingDetails";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto p-4 md:p-0">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="flex-1">
            <ShippingDetails />
          </div>
          <div className="flex-1">
            <OrderSummary />
            <PaymentInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
