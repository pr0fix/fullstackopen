import { CoursePartsProps } from "../types";

const Total = (props: CoursePartsProps) => {  
    const totalExercises: number = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return (
        <p>Number of exercises {totalExercises}</p>
    );
};

export default Total;