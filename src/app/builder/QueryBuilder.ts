
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery : Query<T[] , T> ;
    public query : Record<string , unknown> ;

    constructor(modelQuery : Query<T[] , T> , query : Record<string , unknown>){
        this.modelQuery = modelQuery ;
        this.query = query ;
    };

    search(searchAbleFields : string[]){
        let searchTerm = this?.query?.searchTerm ;
        if(searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or : searchAbleFields.map((field) => ({ [field] : {$regex : searchTerm , $options : "i"} }) as FilterQuery<T>)
            }) ;
        }
        return this ;
    }

    filter(){
        const excludeFields = ["searchTerm" , "page" , "limit" , "sort" , "fields"] ;
        excludeFields.forEach((el) => delete this.query[el]) ;
        this.modelQuery = this.modelQuery.find(this.query as FilterQuery<T>).populate("admissionSemester").populate({path : "academicDepartment" , populate : {path : "academicFaculty"}}) ;
        return this ;
    }

    
}

export default QueryBuilder ;
