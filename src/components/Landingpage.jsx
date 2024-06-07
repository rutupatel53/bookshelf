import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

export const Landingpage = () => {
  const [docs, setDocs] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Api =
      "https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1";
    const fetchBookData = async () => {
      try {
        const res = await fetch(Api);
        const data = await res.json();
        setDocs(data.docs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();

    const storedBooks = JSON.parse(localStorage.getItem("addedBooks")) || [];
    setAddedBooks(storedBooks);
  }, []);

  const handleAddBooks = (book) => {
    const newBooks = [...addedBooks, book];
    setAddedBooks(newBooks);
    localStorage.setItem("addedBooks", JSON.stringify(newBooks));
    alert("Book added to your collection");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const newSuggestions = docs.filter((doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(newSuggestions);
    setActiveSuggestionIndex(0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]);
  };

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="flex text-xl md:text-3xl text-blue text-blue-600">
          Welcome To Your BookShelf
        </h1>
        <h2 className="text-xl flex text-black">Search By Book name:</h2>
        <div className="relative w-64">
          <input
            className="rounded-lg border-2 text-black mt-3 p-2 border-black w-full"
            placeholder="Search For your book"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-black rounded-lg w-full mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.key}
                  className={`p-2 hover:bg-gray-200 cursor-pointer ${
                    index === activeSuggestionIndex ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="md:text-end text-center md:mr-24">
        <Link to={"/book-collection"}>
          <button className="border-2 border-black font-sans text-2xl text-white bg-green-400 rounded-lg mt-5 md:mt-0 w-48 h-12 md:h-14">
            My BookShelf
          </button>
        </Link>
      </div>

      {/* Card */}
      {loading ? (
        <div className="flex justify-center items-center">
          <LineWave type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <div className="grid grid-flow-row items-center justify-center sm:grid-flow-col gap-2 sm:grid-cols-5 sm:grid-rows-2 sm:mx-8 mt-12">
          {Array.isArray(filteredDocs) &&
            filteredDocs.map((doc) => (
              <div
                key={doc.key}
                className="border-2 rounded-lg border-black w-72 h-96 my-7 bg-gray-200 sm:h-80 md:w-64 grid"
              >
                <h1 className="text-center text-2xl md:text-lg p-1 m-4 text-blue-600">
                  <span className="text-black">Book Title:</span> {doc.title}
                </h1>
                <p className="text-blue-600 p-1 text-center">
                  <span className="text-black">Author:</span>{" "}
                  {doc.author_name
                    ? doc.author_name.join(", ")
                    : "Unknown Author"}
                </p>
                <button
                  onClick={() => handleAddBooks(doc)}
                  className="border-2 border-black font-sans text-xl justify-self-center text-white bg-green-400 rounded-lg w-48 h-12"
                >
                  Add Book
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
