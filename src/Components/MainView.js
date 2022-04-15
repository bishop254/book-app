import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./MainView.css";

const BOOK_QUERY = gql`
  query GetBook {
    book {
      author
      title
      pages {
        content
        tokens {
          value
        }
      }
    }
  }
`;

const MainView = () => {
  const { data, loading, error } = useQuery(BOOK_QUERY); //data is the object returned from our endpoint.
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  //Toggle between viewing the page and viewing the token value.
  const goBack = () => {
    let mainDiv = document.querySelector(".main");
    let tokenDiv = document.querySelector(".token");
    let tokenInfo = document.querySelector(".tokenInfo");

    tokenDiv.removeChild(tokenInfo);
    tokenDiv.classList.add("unactive");
    mainDiv.classList.remove("unactive");
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <p>{data.book.author}</p>
          <p>{data.book.title}</p>
        </div>
        {data.book.pages.map((page) => (
          <div className="content">{page.content}</div>
        ))}
      </div>
      <div className="token unactive">
        <button onClick={goBack}>Exit</button>
      </div>
    </>
  );
};

export default MainView;
