import express from "express";

// Initial setup
const app = express();

// Middlewares
app.use(express.json());

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
