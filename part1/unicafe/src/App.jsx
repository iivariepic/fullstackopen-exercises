import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatsLabel = ({ text, number }) => <label style={{display: "block"}}>{text} {number}</label>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div className="Buttons">
        <Header text="give feedback"/>
        <Button text="good" onClick={() => setGood(good + 1)}/>
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" onClick={() => setBad(bad + 1)}/>
      </div>
      <div className="Statistics">
        <Header text="statistics"/>
        <StatsLabel text="good" number={good}/>
        <StatsLabel text="neutral" number={neutral}/>
        <StatsLabel text="bad" number={bad}/>
      </div>
    </>
  )
}

export default App