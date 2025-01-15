"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const hasTimeConflict = (assignedSchedules, newSchedule) => {
    for (const schedule of assignedSchedules) {
        const existingStartTime = new Date(`2007-03-05T${schedule === null || schedule === void 0 ? void 0 : schedule.startTime}:00`);
        const existingEndTime = new Date(`2007-03-05T${schedule === null || schedule === void 0 ? void 0 : schedule.endTime}:00`);
        const newStartTime = new Date(`2007-03-05T${newSchedule === null || newSchedule === void 0 ? void 0 : newSchedule.startTime}:00`);
        const newEndTime = new Date(`2007-03-05T${newSchedule === null || newSchedule === void 0 ? void 0 : newSchedule.endTime}:00`);
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
