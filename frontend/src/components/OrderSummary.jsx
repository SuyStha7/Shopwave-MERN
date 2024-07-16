
const OrderSummary = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <ul>
        <li className="flex justify-between mb-2">
          <span>Product 1</span>
          <span>$50.00</span>
        </li>
        <li className="flex justify-between mb-2">
          <span>Product 2</span>
          <span>$30.00</span>
        </li>
        <li className="flex justify-between mb-2">
          <span>Product 3</span>
          <span>$20.00</span>
        </li>
      </ul>
      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-4">
        <span>Total</span>
        <span>$100.00</span>
      </div>
    </div>
  );
};

export default OrderSummary;
