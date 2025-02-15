
import config from "../config";
import { userRole } from "../modules/user/user.constant"
import { UsersModel } from "../modules/user/user.model"

const superAdmin = {
    id : "0001" ,
    email : "henten@gmail.com" ,
    password : config.superAdminPassword ,
    needsPasswordChange : false ,
    role : "superAdmin" ,
    status : "in-progress",
    isDeleted  : false,
}

const seedSuperAdmin = async () => {
    const isSuperAdminAxist = await UsersModel.findOne({role : userRole.superAdmin}) ;
    if(!isSuperAdminAxist){
        await UsersModel.create(superAdmin)
    }
}

export default seedSuperAdmin ;
