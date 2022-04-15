import React from "react";

const Content = ({ item, index, token }) => {
  let arr = item.split(" ");

  //Display token value on user click event
  const handleClick = (event) => {
    let clickedWord = event.target.innerHTML.toLowerCase();
    
    // Regex to remove punctuation marks after word.
    let cleanWord = clickedWord.replace(/\W*$/i, ""); 
    cleanWord = cleanWord.replace(/^\W/gi, "");

    let tokenArr = token.filter(
      (tk) => clickedWord.includes(tk.value) && tk.value === cleanWord
    ); // Allows us to match a word that is beside a punctuation mark(", ., ?)

    //Display the token value on the current user view.
    let mainDiv = document.querySelector(".main");
    let tokenDiv = document.querySelector(".token");
    let pagesDiv = document.querySelector(".pagesDiv");
    let newElement = document.createElement("div");

    newElement.classList.add("tokenInfo"); //Gives it a className which allows us to remove this element when needed.
    newElement.innerHTML = tokenArr[0]?.value; //tokenArr may return an array with more than one element.

    mainDiv.classList.add("unactive");
    pagesDiv.classList.add("unactive");
    tokenDiv.classList.remove("unactive");

    tokenDiv.appendChild(newElement);
  };

  return arr.map((word) => (
    <>
      <span onClick={(e) => handleClick(e)}>{word}</span>
      <span> </span>
    </>
  ));
};

export default Content;
