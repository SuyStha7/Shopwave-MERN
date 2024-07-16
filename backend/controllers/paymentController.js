import stripe from "stripe";
//process payment
const processPayment = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "npr",
    metadata: { integration_check: "accept_a_payment" },
  });
  res.json({ client_secret: paymentIntent.client_secret });
};

//send stripe api key to frontend
const sendStripeAPI = (req, res) => {
  res.json({ stripeApiKey: process.env.STRIPE_API_KEY });
};

export { processPayment, sendStripeAPI };
