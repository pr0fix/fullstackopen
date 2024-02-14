import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
		<h1>give feedback</h1>
		<Button handleClick={() => setGood(good+1)}>good</Button>
		<Button handleClick={() => setNeutral(neutral+1)}>neutral</Button>
		<Button handleClick={() => setBad(bad+1)}>bad</Button>
		<Statistics good={good} neutral={neutral} bad={bad}/>
	</>
  );
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
	<h2>statistics</h2>
	{props.good > 0 || props.neutral > 0 ||props.bad > 0?
	<table>
		<tbody>
			<StatisticLine text="good" value={props.good}/>
			<StatisticLine text="neutral" value={props.neutral}/>
	 		<StatisticLine text="bad" value={props.bad}/>
	 		<StatisticLine text="all" value={total}/>
	 		<StatisticLine text="average" value={average}/>
			<StatisticLine text="positive" value={`${positive} %`} />
		</tbody>
	</table>
	: "No feedback given"}
	</>
	);
}

const StatisticLine = (props) => {
	return(
	<>
	<tr>
		<td>{props.text}</td>
		<td>{props.value}</td>
	</tr>
	</>
	);
}


export default App