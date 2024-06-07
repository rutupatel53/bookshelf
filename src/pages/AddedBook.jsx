import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AddedBook = () => {
  const [addedBooks, setAddedBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("addedBooks")) || [];
    setAddedBooks(storedBooks);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl mb-5">Added Books</h1>
      <div className="md:text-end text-center md:mr-24">
        <Link to={"/"}>
          <button className="border-2 border-black font-sans text-2xl text-white bg-green-400 rounded-lg mt-5 md:mt-0 w-48 h-12 md:h-14">
            Back To Home
          </button>
        </Link>
      </div>
      <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-5 gap-5">
        {addedBooks.map((book, index) => (
          <div
            key={index}
            className="border-2 rounded-lg border-black w-72 h-96 my-7 bg-gray-200 sm:h-72 md:w-52 grid"
          >
            <h1 className="text-center text-2xl md:text-lg p-1 text-blue-600">
              <span className="text-black">Book Title:</span> {book.title}
            </h1>
            <p className="text-blue-600 p-1 text-center">
              <span className="text-black">Author:</span> {book.author_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
