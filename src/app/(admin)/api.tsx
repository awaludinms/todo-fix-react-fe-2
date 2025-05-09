"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserInfo() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token == undefined) {
        redirect("/login")
    }

    const response = await fetch(process.env.BASE_URL_API + "/user", {
        method: "GET",
        headers:{
            'Authorization' : 'Bearer ' + token?.value
        }
    })

    return response.json();
}
