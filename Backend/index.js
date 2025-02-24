import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// MongoDB conector 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error-MongoDB:", err));


const bookSchema = new mongoose.Schema({
  author: String,
  title: String,
  country: String,
  language: String,
  link: String,
  year: Number,
  pages: Number,
  id: { type: Number, unique: true, required: true },
});

const Book = mongoose.model("Book", bookSchema);

// Get all books or optional title filter
app.get("/books", async (req, res) => {
  try {
    const filter = req.query.title ? { title: req.query.title } : {};
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create book
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete book by id
app.delete("/books/id/:id", async (req, res) => {
  try {
    const result = await Book.findOneAndDelete({id:req.params.id}) ;
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", book: result });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
