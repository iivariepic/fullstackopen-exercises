import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests'
import {useNotificationDispatch} from "../NotificationContext.jsx";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (prevAnecdotes) =>
        prevAnecdotes.concat(newAnecdote)
      )
      dispatchNotification({ type:"UPDATE", payload:`anecdote '${newAnecdote.content}' created` })
    },
    onError: (error) => {
      dispatchNotification({ type:"UPDATE", payload:`'${error.response.data.error}'` })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
