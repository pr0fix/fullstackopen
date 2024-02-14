const Course = (props) => {
    return(
        <>
        	<Header course={props.course.name}/>
			<Content parts={props.course.parts}/>
			<Total exercises={props.course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
        </>
    );
}

const Header = (props) => <h1>{props.course}</h1>;
  

const Part = (props) => {
	return (
	<>
	{props.parts.map((part) => (
		<p key={part.id}>{part.name} {part.exercises}</p>
	))}
	</>
	);
  }
  
  
const Content = (props) => <Part parts={props.parts}/>
	  
const Total = ({exercises}) => <p style={{fontWeight:"bold"}}>total of {exercises} exercises</p>

export default Course;