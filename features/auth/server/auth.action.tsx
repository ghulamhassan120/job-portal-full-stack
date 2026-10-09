"use server";

import { usersTable } from "@/src/drizzle/schema";
import { db } from "@/src/config/db";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { registerUserSchema, RegistrationUserData } from "./auth.schema";
import { createSessionAndSetCookie } from "./use-cases/sessions";
export const registrationAction = async (data: RegistrationUserData) => {
  try {
    const {data:validatedData,error} =registerUserSchema.safeParse(data)
    if(error) return {status:"ERROR",message:error.issues[0].message};
    const { name, userName, email, password, role } = validatedData;
    const [user]=await db.select().from(usersTable).where(or(eq(usersTable.email,email),eq(usersTable.userName,userName)))
    if (user) {
        if (user.email===email) {
            return{
                status:"ERROR",
                message:"Email Already Exists"
            }
        } else {
            return{
                status:"ERROR",
                message:"userName Already Exists"
            }
        }
    }
    const hashPassword = await argon2.hash(password);
    const [result]=await db
      .insert(usersTable)
      .values({ name, userName, email, password: hashPassword, role });
      console.log(result);
      
    await createSessionAndSetCookie(result.insertId)
      return {
        success:"SUCCESS",
        message:"Registration Completed Successfully"
      }
  } catch (error) {
     return {
        success:"ERROR",
        message:"UnKnown Error Occurred Please Try Again Later"
      }
  }
};

type LoginData= {
  email: string;
  password: string;
}
export const loginUserAction=async(data:LoginData)=>{
    try {
        const {email,password}=data;
         const [user]=await db.select().from(usersTable).where(eq(usersTable.email,email))
         if(!user){
            return {status:"ERROR",message:"Invalid Email or Password"}
         }

         const isValidPassword=await argon2.verify(user.password,password);
         if (!isValidPassword) {
            return {status:"ERROR",message:"Invalid Email or Password"}
         }
         await createSessionAndSetCookie(user.id)
        return {status:"SUCCESS",message:"Login Successfully"}
    } catch (error) {
        return {status:"ERROR",message:"UnKnown Error Occurred Please Try Again Later"}
    }
}