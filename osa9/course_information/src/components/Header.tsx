import { CourseNameProps } from "../types";

const Header = (props: CourseNameProps) => {  
    return (
        <h1>{props.courseName}</h1>
    );
};

export default Header;