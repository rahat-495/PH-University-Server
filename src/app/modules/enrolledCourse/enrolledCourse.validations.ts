
import { z } from "zod"

const createEnrolledCourseValidationSchema = z.object({
    body : z.object({ offeredCouse : z.string() })
})

export const enrolledCourseValidations = {
    createEnrolledCourseValidationSchema ,
}
