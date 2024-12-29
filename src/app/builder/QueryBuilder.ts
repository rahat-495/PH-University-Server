
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery : Query<T[] , T> ;
    public query : Record<string , unknown> ;

    constructor(modelQuery : Query<T[] , T> , query : Record<string , unknown>){
        this.modelQuery = modelQuery ;
        this.query = query ;
    };

    search(searchAbleFields : string[]){
        let searchTerm = "" ;
        if(this?.query?.searchTerm){
            searchTerm = this?.query?.searchTerm as string ;
        }
        if(this?.query?.searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or : searchAbleFields.map((field) => ({ [field] : {$regex : searchTerm , $options : "i"} }) as FilterQuery<T>)
            }) ;
        }
        return this ;
    }
}

export default QueryBuilder ;
