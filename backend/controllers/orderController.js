import OrderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";

//post order
const postOrder = async (req, res) => {
  //post data to orderItem model and return the store id of that data
  const orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItemData) => {
      let newOrderItem = new OrderItem({
        quantity: orderItemData.quantity,
        product: orderItemData.id,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemIdResolved = await orderItemIds;

  //calculate total amount for single order
  const totalAmount = await Promise.all(
    orderItemIdResolved.map(async (orderId) => {
      const itemOrder = await OrderItem.findById(orderId).populate(
        "product",
        "product_price"
      );
      const total = itemOrder.quantity * itemOrder.product.product_price;
      return total;
    })
  );

  //calculate total price of all product
  const totalPrice = totalAmount.reduce((a, b) => a + b, 0);

  //post data to order model
  let order = new Order({
    orderItems: orderItemIdResolved,
    shippingAddress: req.body.shippingAddress,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  order = await order.save();
  if (!order) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(order);
};

//order list
const orderList = async (req, res) => {
  const order = await Order.find()
    .populate("user", "name")
    .sort({ createdAt: -1 });
  if (!order) {
    return res.status(400).json({ error: "something went wrong" });
  } else {
    res.send(order);
  }
};

const orderDetails = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });
  if (!order) {
    return res.status(400).json({ error: "something went wrong" });
  } else {
    res.send(order);
  }
};

//update status
const updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) {
    return res.status(400).json({ error: "something went wrong" });
  } else {
    res.send(order);
  }
};
//Order list of specific user
const userList = async (req, res) => {
  const order = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .sort({ createdAt: -1 });
  if (!order) {
    return res.status(400).json({ error: "something went wrong" });
  } else {
    res.send(order);
  }
};

export { postOrder, orderList, updateStatus, userList, orderDetails };
