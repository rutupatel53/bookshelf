// import React, { useEffect, useState } from "react";

// export const Card = () => {
//   const [docs, setDocs] = useState([]);
//   const [addedBooks, setAddedBooks] = useState([]);

//   useEffect(() => {
//     const Api =
//       "https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1";
//     const fetchBookData = async () => {
//       try {
//         const res = await fetch(Api);
//         const data = await res.json();
//         setDocs(data.docs);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBookData();

//     // Load added books from localStorage on component mount
//     const storedBooks = JSON.parse(localStorage.getItem("addedBooks")) || [];
//     setAddedBooks(storedBooks);
//   }, []);

//   const handleAddBooks = (book) => {
//     const newBooks = [...addedBooks, book];
//     setAddedBooks(newBooks);
//     localStorage.setItem("addedBooks", JSON.stringify(newBooks));
//     alert("Book added to your collection");
//   };

//   return (
//     <>
//       <div className="grid grid-flow-row items-center justify-center sm:grid-flow-col gap-5 sm:grid-cols-5 sm:grid-rows-2 sm:mx-8 mt-12">
//         {Array.isArray(docs) &&
//           docs.map((doc) => (
//             <div
//               key={doc.key}
//               className="border-2 rounded-lg border-black w-72 h-96 my-7 bg-gray-200 sm:h-72 md:w-52 grid"
//             >
//               <h1 className="text-center text-2xl md:text-lg p-1 text-blue-600">
//                 <span className="text-black">Book Title:</span> {doc.title}
//               </h1>
//               <p className="text-blue-600 p-1 text-center">
//                 <span className="text-black">Author:</span>{" "}
//                 {doc.author_name
//                   ? doc.author_name.join(", ")
//                   : "Unknown Author"}
//               </p>
//               <button
//                 onClick={() => handleAddBooks(doc)}
//                 className="border-2 border-black font-sans text-xl justify-self-center text-white bg-green-400 rounded-lg w-48 h-12"
//               >
//                 Add Book
//               </button>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };
