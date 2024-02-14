const Course = (props) => {
    return(
        <>
        	<Header course={props.course.name}/>
			<Content parts={props.course.parts}/>
			<Total parts={props.course.parts}/>
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
	  

  
  const Total = (props) => {
	let totalExercises = 0;
	props.parts.forEach(part => {
		totalExercises += part.exercises;
	});
	  return (
		  <>
		  <p style={{fontWeight:"bold"}}>total of {totalExercises} exercises</p>
		  </>
	  );
  }


export default Course;