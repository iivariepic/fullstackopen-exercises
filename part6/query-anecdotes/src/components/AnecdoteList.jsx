import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from '../requests'

const Anecdote = ({ anecdote, onClick }) =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={onClick}>vote</button>
    </div>
  </div>

const AnecdoteList = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (prevAnecdotes) =>
        prevAnecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      )
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isPending ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} onClick={() => handleVote(anecdote)}/>
      )}
    </div>
  )
}

export default AnecdoteList
