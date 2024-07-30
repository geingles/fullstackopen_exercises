import { useState } from 'react'
import { Button } from './components/Button'
import { Anecdote } from './components/Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initializeVotes = () => (Array(anecdotes.length + 1).join('0').split('').map(parseFloat))

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initializeVotes)
  
  const handleClickNext = () => {
    const rnd = (anecdotes.length > 0) ? Math.floor(Math.random() * anecdotes.length) : 0
    setSelected(rnd)
  }

  const handleClickVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  
  const mostVoted = votes.indexOf(Math.max(...votes))
  
  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <p>
        <Button handleClick={handleClickVote} text="vote" />
        <Button handleClick={handleClickNext} text="next anecdote" />
      </p>
      <Anecdote title="Anecdote with most votes" anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App