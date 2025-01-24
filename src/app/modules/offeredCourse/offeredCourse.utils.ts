
import { TDays } from "./offeredCourse.interface"

type TSchedules = {
    days : TDays[] ;
    endTime : string ;
    startTime : string ;
}

export const hasTimeConflict = (assignedSchedules : TSchedules[] , newSchedule : TSchedules) => {
    for(const schedule of assignedSchedules){
        const existingStartTime = new Date(`2007-03-05T${schedule?.startTime}:00`) ;
        const existingEndTime = new Date(`2007-03-05T${schedule?.endTime}:00`) ;
        const newStartTime = new Date(`2007-03-05T${newSchedule?.startTime}:00`) ;
        const newEndTime = new Date(`2007-03-05T${newSchedule?.endTime}:00`) ;
        
        if(newStartTime < existingEndTime && newEndTime > existingStartTime){
            return true ;
        }
    }
    return false ;
}
