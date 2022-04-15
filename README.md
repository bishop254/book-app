# React App with GraphQL
A simple React App that queries a GraphQL endpoint which returns a **book** object.

This object is parsed and shows 2 pages in its view. 

Pagination is implemented to navigate through the **pages** in the **book** object.

`ApolloClient` is used to query our GraphQL endpoint.

---
## Installing required libraries
```bash
npm install @apollo/client graphql -legacy-peer-deps
```

---
## Steps taken
* Create an ApolloClient file that connects to our endpoint.
   * `./ApolloClient/client.js`
* Wrap **App** component inside an **ApolloProvider** to connect our *Apollo Client* to React.
  * *Apollo Client* is now available from anywhere in the component tree.
* We will require 3 additional components
  * **MainView** which consumes data fetched from our query.
  * **Content** which takes in a pair of pages with sentences. It also listen to click events.
  * **Pagination** which allows for page switching.
* Write logic for our 3 components.
* Add CSS styling to the App.

---
## Running the book-app
After cloning the repository:
```bash
npm start
```

