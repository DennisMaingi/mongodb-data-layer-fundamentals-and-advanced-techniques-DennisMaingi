// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ yearPublished: { $gt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "J.K. Rowling" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 12.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" });


// ADVANCED QUERIES
// 1. Books in stock and published after 2010
db.books.find(
  {
    inStock: true,
    yearPublished: { $gt: 2010 }
  }
);


// 2. Projection: return only title, author, and price
db.books.find(
  {}, // Match all
  { _id: 0, title: 1, author: 1, price: 1 }
);


// 3. Sort by price ascending
db.books.find().sort({ price: 1 });


// 4. Sort by price descending
db.books.find().sort({ price: -1 });


// 5. Pagination: page 1 (skip 0, limit 5)
db.books.find().skip(0).limit(5)

// Page 2 (skip 5, limit 5)
// Page 1
db.books.find().skip(0).limit(5);

// Page 2
db.books.find().skip(5).limit(5);

// Page 3
db.books.find().skip(10).limit(5);

// AGGREGATION PIPELINE QUERIES
// 1. Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 } // Optional: sort by highest avg price
  }
]);


// 2. Author with most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  }
]);

// 3. Group books by publication decade and count
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
  {
    $sort: { _id: 1 } // Sort decades chronologically
  }
]);


//INDEXING QUERIES
// 1. Create index on title
db.books.createIndex({ title: 1 })

// 2. Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to show performance
db.books.find({ title: "The Alchemist" }).explain("executionStats");

// AGGREGATION PIPELINE QUERIES
// 1. Books in stock and published after 2010
db.books.find(
  {
    inStock: true,
    yearPublished: { $gt: 2010 }
  }
);


// 2. Projection: return only title, author, and price
db.books.find(
  {}, // Match all
  { _id: 0, title: 1, author: 1, price: 1 }
);


// 3. Sort by price ascending
db.books.find().sort({ price: 1 });


// 4. Sort by price descending
db.books.find().sort({ price: -1 });


// 5. Pagination: page 1 (skip 0, limit 5)
db.books.find().skip(0).limit(5)

// Page 2 (skip 5, limit 5)
// Page 1
db.books.find().skip(0).limit(5);

// Page 2
db.books.find().skip(5).limit(5);

// Page 3
db.books.find().skip(10).limit(5);

