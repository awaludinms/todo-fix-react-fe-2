"use client"
import Link from "next/link"
import React, { useState } from "react"
import { setCookie } from "@/app/actions/auth"

const Login = () => {
    type Values = {
        email: string,
        password: string,
    }

    const [values, setValues] = useState<Values>({
        email: "",
        password: "",
    })

    const postData = async () => {
        const response = await fetch(process.env.BASE_URL_API + "/login", {
            method: 'POST',
            body: JSON.stringify({
                'email': values["email"],
                'password': values["password"],
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            return response.json()
        } else {
            (document.getElementById("my_modal_1") as HTMLDialogElement).showModal()
        }
    }

    function LoginSubmit(): React.MouseEventHandler<HTMLButtonElement> | undefined {
        // throw new Error("Function not implemented.")
        try {
            postData().then((response) => {
                console.log(response)            
                setCookie(response.token, values["email"])
            })
        } catch (error) {
            console.log(error)
        }

        return
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues({ ...values, [event.target.name]: event.target.value })
    }


    return (
        <div>
            <fieldset className="shadow-xl/20 fieldset bg-white border-base-300 rounded-box w-xs border px-6 py-12 ">
                {/* <legend className="fieldset-legend">Register</legend> */}
                <h1 className="text-2xl">Login</h1>

                <label className="label">Email</label>
                <input type="text" className="input" name="email" placeholder="email" onChange={handleChange} />

                <label className="label">Password</label>
                <input type="password" className="input" name="password" placeholder="password" onChange={handleChange} />

                <button className="btn btn-neutral mt-4" onClick={LoginSubmit}>Login</button>
                <div className="text-xs flex justify-end mt-3"><span className="mr-1">Belum Punya Akun</span><Link className="text-red-500 hover:underline" href="/register">Registrasi</Link></div>  
            </fieldset>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Terjadi Kesalahan!</h3>
                    <p className="py-4">
                        Periksa Kembali Formulir Login
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Tutup</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Login