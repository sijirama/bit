import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()
const saltFactor  = Number(process.env.SALTFACTOR!)

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt:Date;
    updatedAt:Date;
}

const UserSchema = new mongoose.Schema(
    {
        email:{type: String,required:true ,unique:true},
        name:{type: String,required:true},
        password:{type: String,required:true}
    },
    {
        timestamps:true,
    }
)

UserSchema.pre("save" , async function(next) {
    let user = this as UserDocument

    if (!user.isModified("password")){
        return next()
    }

    const salt = await bcrypt.genSalt(saltFactor)
    const hash = await bcrypt.hashSync(user.password , salt)
    user.password = hash
    return next()

})

const UserModel = mongoose.model('User', UserSchema)
export default UserModel