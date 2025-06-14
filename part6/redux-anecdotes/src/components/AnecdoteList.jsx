import { useSelector, useDispatch } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer.js";

const Anecdote = ({anecdote, handleClick}) =>
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
      .includes(state.filter.toLowerCase())
    ))
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)


  const vote = (anecdote) => {
    dispatch(voteOn(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </>
  )
}

export default AnecdoteList