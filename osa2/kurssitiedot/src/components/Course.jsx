const Course = ({course}) => {
    return(
        <>
        	<Header name={course.name}/>
			<Content parts={course.parts}/>
        </>
    );
}

const Header = ({name}) => <h2>{name}</h2> 
	
		
  
const Part = ({name, exercises}) => <p>{name} {exercises}</p>

  
  
const Content = ({parts}) => {
	return(
		<>
		
			{parts.map(part => 
				<Part 
				key={part.id} 
				name={part.name} 
				exercises={part.exercises}/>
			)}
			<Total exercises={parts.reduce((s, p) => s + p.exercises, 0)}/>
		
		</>

	);
}
	  

const Total = ({exercises}) => <p style={{fontWeight:"bold"}}>total of {exercises} exercises</p>


export default Course;