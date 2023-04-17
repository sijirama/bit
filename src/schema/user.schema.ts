import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
    body:object({
        name:string({required_error:"Name is required"}),
        password:string({required_error:"Password is required"}).min(7 , "Password too short - should be at least 7 characters"),
        passwordConfirmation:string({ required_error:"Password Confirmation is required"}),
        email:string({required_error:"Email is required"}).email("Not a valid email address")
    }).refine((data) => data.password === data.passwordConfirmation , {
        message:"Passwords do not match",
        path:["passwordConfirmation"]
    })
})

export type createUserInput = TypeOf<typeof createUserSchema >