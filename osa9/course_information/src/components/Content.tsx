import { CoursePartsProps } from "../types";

const Content = (props: CoursePartsProps) => {
    return (
        <div>
            <ul>
                {props.courseParts.map((part) => (
                    <li key={part.name}>
                        {part.name} {part.exerciseCount}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content;