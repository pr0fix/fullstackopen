export interface CourseNameProps {
  courseName: string;
}

export interface Course {
  name: string;
  exerciseCount: number;
}

export interface CoursePartsProps {
  courseParts: Course[];
}
