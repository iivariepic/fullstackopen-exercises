import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, number }) => <tr><td>{text}</td><td>{number}</td></tr>

const Statistics = ({ feedback }) => {
  const all = Object.values(feedback).reduce((sum, num) => sum + num, 0);
  // Return "No feedback given" if there are no values
  if (all === 0) {
    return (
      <div>
        <Header text="statistics"/>
        <label>No feedback given</label>
      </div>
    )
  }
  // Calculate feedback stats if there is feedback
  const feedbackMap = {
    good: 1,
    neutral: 0,
    bad: -1
  };
  const weightedSum = Object.entries(feedback).reduce((sum, [level, count]) =>
  {return sum + (feedbackMap[level] * count)}, 0);
  const average = weightedSum / all
  const goodPercentage = ((feedback.good / all) * 100)

  return (
    <div>
      <Header text="statistics"/>
      <table>
        <tbody>
          <StatisticLine text="good" number={feedback.good}/>
          <StatisticLine text="neutral" number={feedback.neutral}/>
          <StatisticLine text="bad" number={feedback.bad}/>
          <StatisticLine text="all" number={all}/>
          <StatisticLine text="average" number={average}/>
          <StatisticLine text="positive" number={goodPercentage.toString().concat("%")}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const buttonPressed = (satisfactionLevel) => {
    setFeedback({
      ...feedback,
    [satisfactionLevel]: feedback[satisfactionLevel] + 1
    })
  }

  return (
    <>
      <div className="Buttons">
        <Header text="give feedback"/>
        <Button text="good" onClick={()=> buttonPressed("good")}/>
        <Button text="neutral" onClick={()=> buttonPressed("neutral")}/>
        <Button text="bad" onClick={()=> buttonPressed("bad")}/>
      </div>
      <Statistics feedback={feedback}/>
    </>
  )
}

export default App