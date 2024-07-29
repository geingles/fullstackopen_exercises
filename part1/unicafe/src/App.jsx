import { useState } from 'react'

const Button = ({ handleClick, text }) =>  (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const DisplayStatistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  const average = (total > 0) ? ((good * 1) + (bad * -1)) / total : 0
  const positive = (total > 0) ? ((good / total) * 100) : 0

  if (total === 0) {
    return (
      <div>
        <p>No Feedback Given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + '%'} />
        </tbody>
      </table>
    </div>
  )

}

const StatisticLine = ({text, value}) => <tr><td><strong>{text}</strong></td><td>{value}</td></tr>
  
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <p>
        <Button handleClick={handleClickGood} text="good" />
        <Button handleClick={handleClickNeutral} text="neutral" />
        <Button handleClick={handleClickBad} text="bad" />
      </p>
      <h1>Statistics</h1>
      <DisplayStatistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App