<<<<<<< HEAD
#  MERN Week 1 Assignment — MongoDB Queries & Indexing

This project demonstrates practical MongoDB usage through basic to advanced queries, aggregation pipelines, and performance optimization using indexes.

---

##  Prerequisites

- Node.js `>=16.20.1`
- MongoDB local or cloud instance
- MongoDB Compass (optional)
- Mongo Shell or MongoDB Atlas CLI

---

##  Assumed Book Document Structure

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "yearPublished": 1988,
  "price": 15.99,
  "inStock": true
}
 Task 1: Basic Queries
Description	Query
Find all books in a specific genre	db.books.find({ genre: "Fiction" })
Find books published after 2010	db.books.find({ yearPublished: { $gt: 2010 } })
Find books by a specific author	db.books.find({ author: "J.K. Rowling" })
Update the price of a book	db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 12.99 } })
Delete a book by title	db.books.deleteOne({ title: "The Alchemist" })

 Task 2: Advanced Queries
Filter + Projection
db.books.find(
  { genre: "Fiction", yearPublished: { $gt: 2010 }, inStock: true },
  { _id: 0, title: 1, author: 1, price: 1 }
);

Sorting
db.books.find().sort({ price: 1 }); // Ascending
db.books.find().sort({ price: -1 }); // Descending

Pagination (5 per page)
db.books.find().skip(0).limit(5);  // Page 1
db.books.find().skip(5).limit(5);  // Page 2

 Task 3: Aggregation Pipelines
 Average Price by Genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" }, totalBooks: { $sum: 1 } } },
  { $sort: { averagePrice: -1 } }
]);

 Author With Most Books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

 Group Books by Publication Decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$yearPublished", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

 Task 4: Indexing & Performance
 Create Index on title
db.books.createIndex({ title: 1 });

 Create Compound Index on author + yearPublished
db.books.createIndex({ author: 1, yearPublished: 1 });

 Check Query Performance with explain()
Without Index
db.books.find({ title: "The Alchemist" }).explain("executionStats");

With Index (after creation)
db.books.find({ title: "The Alchemist" }).explain("executionStats");


Look for "stage": "IXSCAN" instead of "COLLSCAN" to confirm index usage.

 Mongoose Integration (Optional)

Use indexes in your Mongoose schema:

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  yearPublished: Number,
  price: Number,
  inStock: Boolean
});

bookSchema.index({ title: 1 });
bookSchema.index({ author: 1, yearPublished: 1 });

module.exports = mongoose.model("Book", bookSchema);

 Testing Tips

Use MongoDB Compass to visually analyze indexes.

Use .explain("executionStats") for benchmarking query performance.

Insert mock data with varied genres, years, and authors to simulate realistic usage.

 Credits

Built as part of MERN Week 1 Assignment to demonstrate core MongoDB concepts:

CRUD operations

Advanced queries

Aggregation framework

Indexing and optimization
=======
# MongoDB Fundamentals - Week 1

## Setup Instructions

Before you begin this assignment, please make sure you have the following installed:

1. **MongoDB Community Edition** - [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)
2. **MongoDB Shell (mongosh)** - This is included with MongoDB Community Edition
3. **Node.js** - [Download here](https://nodejs.org/)

### Node.js Package Setup

Once you have Node.js installed, run the following commands in your assignment directory:

```bash
# Initialize a package.json file
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb
```

## Assignment Overview

This week focuses on MongoDB fundamentals including:
- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
- Indexing for performance

## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 
>>>>>>> 0fcd1a6b59e5934a6c57cfca568ccf5922ad1d48
