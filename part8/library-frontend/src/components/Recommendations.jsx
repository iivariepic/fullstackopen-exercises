import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/books.js"
import { BooksTable } from "./BooksTable.jsx"
import { ME } from "../queries/auth.js"

export const Recommendations = () => {
  const user = useQuery(ME)
  const resultFiltered = useQuery(ALL_BOOKS, {
    variables: { genre: user.data?.me.favoriteGenre ?? undefined },
  })

  const filteredBooks = resultFiltered.data?.allBooks ?? []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.data?.me.favoriteGenre}</b></p>
      <BooksTable books={filteredBooks} />
    </div>
  )
}