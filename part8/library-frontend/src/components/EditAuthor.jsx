import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/authors";

const EditAuthor = () => {
  const [ author, setAuthor ] = useState("")
  const [ year, setYear ] = useState("")

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: { ALL_AUTHORS }
  })

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({ variables: { name: author, setBornTo: parseInt(year) } })

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>Set author birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
