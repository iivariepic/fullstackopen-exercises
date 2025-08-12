import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries/authors";

const EditAuthor = () => {
  const [ author, setAuthor ] = useState(null)
  const [ year, setYear ] = useState("")

  const authorResult = useQuery(ALL_AUTHORS)

  const authorOptions = !authorResult.loading
    ? authorResult.data.allAuthors.map(author => (
      { value: author.name, label: author.name }
      )
    ) : []

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({ variables: { name: author.value, setBornTo: parseInt(year) } })

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>Set author birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={author}
            onChange={setAuthor}
            options={authorOptions}
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
