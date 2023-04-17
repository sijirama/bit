import UserModel , {UserDocument} from "../model/user.model"

export default async function createUser( user:Partial<Omit<UserDocument , "createdAt" | "updatedAt">>    ){
    try {
       return await UserModel.create(user); 
    } catch (error:any) {
        throw new Error(error)
    }
}