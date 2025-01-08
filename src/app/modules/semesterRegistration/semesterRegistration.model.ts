
import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({}) ;

export const semesterRegistrationsModel = model<TSemesterRegistration>("semesterRegistration" , semesterRegistrationSchema) ;
