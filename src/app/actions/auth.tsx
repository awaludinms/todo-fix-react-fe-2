"use server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function setCookie(token: string, email: string) {
    const cookieStore = await cookies()
    const expires = new Date(Date.now() + (60* 60 * 1000)); // Set session expiration time (3600 seconds/1 hour from now)

    cookieStore.set("token", token, {expires})
    cookieStore.set("email", email, {expires})

    redirect("/dashboard")
}