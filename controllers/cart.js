const { Cart, CartItem, Book } = require("../models/index");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          include: [Book]
        }
      ]
    });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json({ message: 'Card data', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { body, user } = req;
    const { bookId, quantity } = body;
    const userId = user.id;

    // Find or create a cart for the user
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) cart = await Cart.create({ userId });

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const isBookAlreadyInCart = await CartItem.findOne({
      where: { cartId: cart.id, bookId }
    });
    if (isBookAlreadyInCart) {
      await CartItem.update({ quantity: parseInt(isBookAlreadyInCart.quantity) + quantity }, { where: { id: isBookAlreadyInCart.id } });
    } else {
      await CartItem.create({
        cartId: cart.id,
        bookId,
        quantity,
      });
    }

    res.status(201).json({ message: 'Book added to cart successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { params, body } = req;
    const { cartId } = params;
    const { bookId } = body;

    // Find or create a cart for the user
    let cart = await Cart.findOne({ where: { id: cartId } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const cartItem = await CartItem.findOne({ where: { cartId, bookId } });
    if (!cartItem) return res.status(404).json({ message: 'Book not found in given cart' });

    await cartItem.destroy();
    res.status(200).json({ message: 'Book removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
