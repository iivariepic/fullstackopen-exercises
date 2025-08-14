import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query getAllByFilterBooks($genre: String){
  allBooks(
      genre: $genre
  ) {
    title
    author {
        name
    }
    published
    genres
  }
}
`

export const ALL_GENRES = gql`
{
  allBooks {
      genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!)
{
  addBook(
    title: $title,
    author: $author,
    published: $published
    genres: $genres
  ) {
    title
    author {
        name
    }
    published
    genres
  }
}
`