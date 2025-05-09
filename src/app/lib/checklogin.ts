"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function checkLogin(){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token == undefined) {
        redirect("/login")
    }

    redirect("/dashboard")
}