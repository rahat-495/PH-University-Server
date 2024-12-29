"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    ;
    search(searchAbleFields) {
        var _a;
        let searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({ [field]: { $regex: searchTerm, $options: "i" } }))
            });
        }
        return this;
    }
    filter() {
        const excludeFields = ["searchTerm", "page", "limit", "sort", "fields"];
        excludeFields.forEach((el) => delete this.query[el]);
        this.modelQuery = this.modelQuery.find(this.query).populate("admissionSemester").populate({ path: "academicDepartment", populate: { path: "academicFaculty" } });
        return this;
    }
    sort() {
        var _a;
        let sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
}
exports.default = QueryBuilder;
