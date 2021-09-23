import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
     token
     user {
       _id
       username
       email
     } 
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($author: String!, $description: String!, $bookId: String!, $image: String!, $link: String!, $title: String!) {
    addBook(author: $author, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
      saveBooks {
        bookId
        authors
        image
        title
        description
      }
    }
  }
`

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        title
        description
      }
    }
  }
`