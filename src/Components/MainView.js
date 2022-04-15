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
  let index = 0;

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
    let pagesDiv = document.querySelector(".pagesDiv");
    let tokenInfo = document.querySelector(".tokenInfo");

    tokenDiv.removeChild(tokenInfo);
    tokenDiv.classList.add("unactive");
    mainDiv.classList.remove("unactive");
    pagesDiv.classList.remove("unactive");
  };

  return (
    <div className="mainDiv">
      <div className="header">
        <p>{data.book.author}</p>
        <p>{data.book.title}</p>
      </div>
      <div className="main">
        {currPages.map((page) => {
          if (page.pageIndex % 2 === 0) {
            return (
              <>
                <div class="split left">
                  <div class="centered">
                    <Content item={page.content} token={page.tokens} />
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div class="split right">
                  <div class="centered">
                    <Content item={page.content} token={page.tokens} />
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      <Pagination
        pagesToDisplay={pageSize}
        totalPages={data.book.pages.length}
        paginate={paginate}
      />
      <div className="token unactive">
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};

export default MainView;
