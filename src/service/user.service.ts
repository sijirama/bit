import UserModel , {UserDocument} from "../model/user.model"

export default async function createUser( user:Partial<UserDocument>){
    try {
       return await UserModel.create(user); 
    } catch (error:any) {
        throw new Error(error)
    }
}