"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout } from "../lib/auth";
import { getUserInfo } from "./api";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    type UserInfo = {
        name: string,
    }

    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: ""
    })

    useEffect(() => {
        getUserInfo().then((res)=> setUserInfo(res))
    }, [])

    return (
        <section>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">TODO</a>
                    <ul className="menu menu-horizontal">
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/todos">TODO</Link></li>
                    </ul>
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            {/* <div className="w-10 rounded-full"> */}
                            {userInfo["name"].toUpperCase()}

                            {/* </div> */}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {/* <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li> */}
                            {/* <li><a>Settings</a></li> */}
                            <li><button onClick={() => (document.getElementById("logout_modal") as HTMLDialogElement).showModal()}>Logout</button></li>

                        </ul>
                    </div>
                </div>
            </div>
            <dialog id="logout_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Konfirmasi Keluar</h3>
                    <p className="py-4">Anda Ingin Keluar</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-primary mr-2" onClick={logout}>Ya</button>
                            <button className="btn btn-secondary">Tidak</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="flex px-1 pt-5 md:px-15 md:py-4 bg-base-200 justify-center-safe h-screen">
                {children}
            </div>
        </section>
    )
}