const { Book } = require('../models/index');

exports.getBooks = async (req, res) => {
  try {
    // Get page and limit from query parameters (with defaults)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Fetch books with pagination
    const books = await Book.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    // Calculate total pages
    const totalPages = Math.ceil(books.count / limit);

    // Send the paginated response
    res.status(200).json({
      message: "Books data",
      books: books.rows, // books data
      pagination: {
        totalItems: books.count,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: "Book data", book });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

exports.addBook = async (req, res) => {
  try {
    // Extract the validated data from the request body
    const { title, author, price, description } = req.body;

    // Create a new book entry in the database
    const newBook = await Book.create({
      title,
      author,
      price,
      description,
    });

    // Send success response
    res.status(201).json({ message: 'Book added successfully', book: newBook, });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal server error', });
  }
};