"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function fetchData() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token == undefined) {
        redirect("/login")
    }
    const response = await fetch(process.env.BASE_URL_API + "/todo", {
        method: "GET",
        headers:{
            'Authorization' : 'Bearer ' + token?.value
        }
    })

    return response.json();
}

export async function fetchDataById(id: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token == undefined) {
        redirect("/login")
    }
    const response = await fetch(process.env.BASE_URL_API + "/todo/" + id, {
        method: "GET",
        headers:{
            'Authorization' : 'Bearer ' + token?.value
        }
    })

    return response.json();
}

export async function saveNewToDo(newDataTodo:any) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    const response = await fetch(process.env.BASE_URL_API + "/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Bearer ' + token?.value
        },
        body: JSON.stringify(newDataTodo)        
    })

    if (response.ok) {
        return response.json()
    }
}

export async function updateEditedToDo(updatedTodo:any, id: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    const response = await fetch(process.env.BASE_URL_API + "/todo/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization' : 'Bearer ' + token?.value
        },
        body: JSON.stringify(updatedTodo)        
    })

    if (response.ok) {
        return response.json()
    }
}

export async function fetchDataFilter(filter: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token == undefined) {
        redirect("/login")
    }
    const response = await fetch(process.env.BASE_URL_API + "/todo/?filter=" + filter, {
        method: "GET",
        headers:{
            'Authorization' : 'Bearer ' + token?.value
        }
    })

    return response.json();
}

export async function deleteTodo(id: number) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (token == undefined) {
        redirect("/login")
    }
    const response = await fetch(process.env.BASE_URL_API + "/todo/" + id, {
        method: "DELETE",
        headers:{
            'Authorization' : 'Bearer ' + token?.value
        }
    })

    return response.json();
}