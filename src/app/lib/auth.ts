"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function logout() {
    // Destroy the session by clearing the session cookie
    const cookieStore = await cookies()
    cookieStore.set("token", "", { expires: new Date(0) });

    redirect("/login")

}