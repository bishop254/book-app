import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./MainView.css";
import Content from "./Content";
import Pagination from "./Pagination";

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
  const pageSize = 2;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const lastPageIndex = currentPage * pageSize;
  const firstPageIndex = lastPageIndex - pageSize;
  const currPages = [...data.book.pages].slice(firstPageIndex, lastPageIndex); //Updates pages displayed to the user.

  // Updates the view(page content) when user navigates to another page.
  const paginate = (pageNo) => {
    setCurrentPage(pageNo);
  };

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
        {currPages.map((page) => (
          <>
            <Content item={page.content} token={page.tokens} />
          </>
        ))}
        <Pagination
          pagesToDisplay={pageSize}
          totalPages={data.book.pages.length}
          paginate={paginate}
        />
      </div>
      <div className="token unactive">
        <button onClick={goBack}>Go Back</button>
      </div>
    </>
  );
};

export default MainView;
