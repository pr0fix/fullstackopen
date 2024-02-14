import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
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
	console.log(props)
	return(
		<button onClick={props.handleClick}>{props.children}</button>
	);
	
}

const Statistics = (props) => {
	console.log(props)
	return(
		<>
		<p>good {props.good}</p>
		<p>neutral {props.neutral}</p>
		<p>bad {props.bad}</p>
		</>
	);
}


export default App