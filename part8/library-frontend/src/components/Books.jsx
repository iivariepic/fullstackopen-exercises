import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES } from "../queries/books"
import { BooksTable } from "./BooksTable"

const GenreSelector = ({ allGenres, setGenre }) => {
  return (
    <div>
      {allGenres.map(genre =>
        <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>
      )}
      <button onClick={() => setGenre(undefined)} key={"all"}>all genres</button>
    </div>
  )
}

const Books = () => {
  const [genre, setGenre] = useState(undefined)
  const resultGenres = useQuery(ALL_GENRES)
  const resultFiltered = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  })

  const genreData = resultGenres.data?.allBooks ?? []
  const allGenres = [...new Set(genreData.flatMap(book => book.genres))]
  const filteredBooks = resultFiltered.data?.allBooks  ?? resultFiltered.previousData?.allBooks ?? []

  return (
    <div>
      <h2>books</h2>

      {genre ? <p>in genre <b>{genre}</b></p> : <p><b>all genres</b></p>}
      <BooksTable books={filteredBooks} />
      <GenreSelector allGenres={[...allGenres]} setGenre={setGenre} />
    </div>
  )
}

export default Books
