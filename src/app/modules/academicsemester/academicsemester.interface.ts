
export type month = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";

export type academicSemester = {
    name : "Autumn" | "Summer" | "Fall" ,
    code : "01" | "02" | "03" ,
    year : Date ,
    startDate : month ,
    endDate : month ,
}
