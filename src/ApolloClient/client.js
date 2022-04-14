import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(), //Prevents us from making unnecessary request if data is already in memory
  link: ApolloLink.from([httpLink]), //Allows data to flow from GraphQL to the in-app state management.
});
