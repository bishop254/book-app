import "./App.css";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient/client";
import MainView from "./Components/MainView";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MainView />
      </div>
    </ApolloProvider>
  );
}

export default App;
