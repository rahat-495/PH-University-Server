
import { Types } from "mongoose";

export type TEnrolledCourseMarks = {
    classTest1 : number ;
    midTerm : number ;
    classTest2 : number ;
    finelTerm : number ;
}

export type TGrade = "A" | "B" | "C" | "D" | "F" | "NA" ;

export type TEnrolledCourse = {
    semesterRegistration : Types.ObjectId ;
    academicSemester ?: Types.ObjectId ;
    academicFaculty : Types.ObjectId ;
    academicDepartment : Types.ObjectId ;
    course : Types.ObjectId ;
    student : Types.ObjectId ;
    offeredCourse : Types.ObjectId ;
    faculty : Types.ObjectId ;
    isEnrolled : boolean ;
    courseMarks : TEnrolledCourseMarks ;
    grade : TGrade;
    gradePoints : number ;
    isCompleted : boolean ;
}
