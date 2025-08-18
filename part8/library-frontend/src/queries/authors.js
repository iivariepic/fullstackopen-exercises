import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    books {
        title
    }
  }
}
`

export const EDIT_AUTHOR = gql`
mutation changeAuthor($name: String!, $setBornTo: Int!)
{
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`