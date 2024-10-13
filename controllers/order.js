const { Cart, Order, OrderItem, Book, CartItem } = require('../models/index');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart
    let cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          include: [Book],
          required: true
        }
      ]
    });

    cart = cart ? cart.get({ plain: true }) : null;
    if (!cart || cart.cartItems?.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    // Calculate total price
    let totalAmount = 0;
    cart.cartItems.forEach(item => {
      totalAmount += item.quantity * item.Book.price;
    });

    // Create order
    const order = await Order.create({ userId, totalAmount });

    // Create order items
    const orderItems = cart.cartItems.map(item => ({
      orderId: order.id,
      bookId: item.bookId,
      quantity: item.quantity,
      price: item.Book.price,
    }));
    await OrderItem.bulkCreate(orderItems);

    // Clear cart
    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [Book]
        }
      ],
    });

    res.status(200).json({ message: "Order data.", orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { params } = req;
    const order = await Order.findOne({
      where: { id: params.orderId },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [Book]
        }
      ]
    });
    res.status(200).json({ message: "Order data.", order });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
