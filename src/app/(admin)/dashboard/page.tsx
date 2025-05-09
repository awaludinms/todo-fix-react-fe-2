"use client"
import React, { useEffect, useState } from "react";
import { fetchData, saveNewToDo } from "@/app/(admin)/todos/api";
import { getUserInfo } from "../api";
import Todos from "../todos/page";
import Forecast from "../forecast/page";

interface TodoData {
    id: string,
    task: string,
    created_at: string,
    status: string,
}

type TodoDataBaru = {
    task: string,
    status: number
}

export default function Page() {
    const [todoData, setTodoData] = useState<TodoData[]>()
    const [values, setValues] = useState<TodoDataBaru>({
        "task": "",
        "status": 0
    })
    const [kutipan, setKutipan] = useState("")
    type UserInfo = {
        name: string,
        email: string,
    }

    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        email: "",
    })

    useEffect(() => {
        console.log(process.env.BASE_URL_API)
        fetchData().then(data => setTodoData(data.data));
        getUserInfo().then((res)=> setUserInfo(res))
    }, [

    ])
    
    return (
        <>
            <div className="grid grid-cols-5 gap-4 w-full">
                <div className="col-span-5 card bg-primary text-primary-content card-md shadow-xl/10 h-min">
                    <div className="card-body">
                        <h2 className="card-title">Forecast</h2>
                        <Forecast />
                    </div>
                </div>
                <div className="card col-span-5 md:col-span-4 bg-base-100 card-md shadow-sm h-dvh">
                    <div className="card-body">
                        <Todos />
                    </div>
                </div>
                <div className="card col-span-5 md:col-span-1 bg-base-100 card-md shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">User Information</h2>
                        <div className="grid grid-cols-8">
                        <div className="font-extrabold col-span-2">Nama</div><div className="col-span-6">{userInfo["name"]}</div>
                        <div className="font-extrabold col-span-2">Email</div><div className="col-span-6">{userInfo["email"]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}