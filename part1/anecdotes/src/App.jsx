import { useState } from 'react'

const Anecdote = ({anecdote, voteCount}) => {
  return (
    <>
      <label style={{display: "block"}}>{anecdote}</label>
      <label style={{display: "block"}}>has {voteCount} votes</label>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const createVoteObject = (number) => {
    // Function to initialize the votes tracking object
    let voteObject = {}
    for (let i = 0; i < number; i++) {
      voteObject[i] = 0
    }
    return voteObject
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(createVoteObject(anecdotes.length))

  const nextAnecdote = () => {
    let randomInt = Math.floor(Math.random() * anecdotes.length)
    // Make sure the same anecdote isn't selected
    while (randomInt === selected) {
      randomInt = Math.floor(Math.random() * anecdotes.length)
    }

    setSelected(randomInt)
  }

  const voteOnSelected = () => {
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1
    };
    setVotes(newVotes);
  }

  const maxVotesKey = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} voteCount={votes[selected]}/>
      </div>
      <div>
        <button onClick={voteOnSelected}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        <Anecdote anecdote={anecdotes[maxVotesKey]} voteCount={votes[maxVotesKey]}/>
      </div>
    </>
  )
}

export default App