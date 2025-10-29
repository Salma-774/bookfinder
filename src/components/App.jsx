import React, { useState } from "react";
import "./BookFinder.css";

function BookFinderApp() {
  const [query, setQuery] = useState("");     // user input
  const [books, setBooks] = useState([]);     // store API results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch data from the API
  const searchBooks = async () => {
    if (!query) {
      setError("Please enter a book title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs);
      } else {
        setError("No books found for that title.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>📚 Book Finder</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-container">
        {books.map((book, index) => (
          <div className="book-card" key={index}>
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
            <p>{book.first_publish_year || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookFinderApp;
