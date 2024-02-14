import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
		<h1>give feedback</h1>
		<Button handleClick={() => setGood(good+1)}>good</Button>
		<Button handleClick={() => setNeutral(neutral+1)}>neutral</Button>
		<Button handleClick={() => setBad(bad+1)}>bad</Button>
		<h2>statistics</h2>
		<Statistics good={good} neutral={neutral} bad={bad}/>
	</>

  )
}

const Button = (props) => {

	return(
		<button onClick={props.handleClick}>{props.children}</button>
	);
	
}

const Statistics = (props) => {
	const total = props.good + props.neutral + props.bad;
	const average = (props.good - props.bad) / total || 0;
	const positive = (props.good/total) * 100 || 0;
	
	
	return(
		<>
		{props.good > 0 || props.neutral > 0 || props.bad > 0 ?
		<>
		<p>good {props.good}</p>
		<p>neutral {props.neutral}</p>
		<p>bad {props.bad}</p>
		<p>all {total}</p>
		<p>average {average}</p>
		<p>positive {positive} %</p></>
		: "No feedback given"}
		</>
	
	);
}



export default App