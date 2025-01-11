
import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>({

});

export const offeredCoursesModel = model<TOfferedCourse>("offeredCourse" , offeredCourseSchema) ;
