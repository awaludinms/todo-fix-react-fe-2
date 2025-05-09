"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"

const Register = () => {
    type Values = {
        name: string,
        email: string,
        password: string,
        konfirmasi_password: string,
    }

    const [values, setValues] = useState<Values>({
        name: "",
        email: "",
        password: "",
        konfirmasi_password: "",
    })

    const postData = async () => {
        const response = await fetch(process.env.BASE_URL_API + "/register", {
            method: 'POST',
            body: JSON.stringify({
                'name': values["name"],
                'email': values["email"],
                'password': values["password"],
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })

        if (response.ok) {
            return response;
        } else {
            (document.getElementById("my_modal_1") as HTMLDialogElement).showModal()
        }
    }

    function RegisterSubmit(): React.MouseEventHandler<HTMLButtonElement> | undefined {
        // throw new Error("Function not implemented.")
        try {
            postData()
        } catch (error) {
            (document.getElementById("my_modal_1") as HTMLDialogElement).showModal()
            console.log(error)
        }

        return
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues({ ...values, [event.target.name]: event.target.value })
    }


    return (
        <div>
            <fieldset className="shadow-xl/20 fieldset bg-white border-base-300 rounded-box w-xs border px-6 py-12">
                {/* <legend className="fieldset-legend">Register</legend> */}
                <h1 className="text-2xl">Register</h1>
                <label className="label">Name</label>
                <input type="text" required className="input" name="name" placeholder="name" onChange={handleChange} />

                <label className="label">Email</label>
                <input type="text" required className="input" name="email" placeholder="email" onChange={handleChange} />

                <label className="label">Password</label>
                <input type="password" required className="input" name="password" placeholder="password" onChange={handleChange} />

                <label className="label">Konfirmasi Password</label>
                <input type="password" className="input" name="konfirmasi_password" placeholder="konfirmasi password" onChange={handleChange} />

                <button className="btn btn-neutral mt-4" onClick={RegisterSubmit}>Register</button>
                <div className="text-xs flex justify-end mt-3"><span className="mr-1">Sudah Punya Akun</span><Link className="text-red-500 hover:underline" href="/login">Login</Link></div>  
            </fieldset>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Terjadi Kesalahan!</h3>
                    <p className="py-4">
                        Periksa Kembali Formulir Registrasi
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Tutup</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    )
}

export default Register