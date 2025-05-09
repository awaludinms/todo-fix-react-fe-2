"use client"
import React, { useEffect, useState } from "react";
import { deleteTodo, fetchData, fetchDataById, fetchDataFilter, saveNewToDo, updateEditedToDo } from "./api";

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

const Todos = () => {
    const [todoData, setTodoData] = useState<TodoData[]>([])
    const [values, setValues] = useState<TodoDataBaru>({
        "task": "",
        "status": 0
    })

    useEffect(() => {
        console.log(process.env.BASE_URL_API)
        fetchData().then(data => setTodoData(data.data));
    }, [

    ])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setValues({ ...values, [event.target.name]: event.target.value })
    }


    async function saveToDo() {
        // throw new Error("Function not implemented.");
        console.log(values)
        saveNewToDo({
            task: values["task"],
            status: values["status"]
        }).then((resp) => {
            console.log(resp)
            fetchData().then(data => setTodoData(data.data));
        })
    }

    async function handleEditToDo(id: number) {
        console.log('fetch data id: ' + id)
        await fetchDataById(id).then(data => {
            console.log(data.task)
            try {


                const task = document.getElementById('task') as HTMLInputElement
                task.value = data.task

                const status = document.getElementById('status') as HTMLSelectElement
                status.value = data.status

                const id = document.getElementById('idTodo') as HTMLInputElement
                id.value = data.id
            } catch (e) {
                console.error(e)
            }
        })
    }

    async function handleViewToDo(id: number) {
        console.log('fetch data id: ' + id)
        await fetchDataById(id).then(data => {
            console.log(data.task)
            try {


                const task = document.getElementById('view_task') as HTMLInputElement
                task.value = data.task

                const status = document.getElementById('view_status') as HTMLSelectElement
                status.value = data.status ? 'Selesai' : 'Belum Selesai'

                const created_at = document.getElementById('view_created_at') as HTMLSelectElement
                created_at.value = new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "full",
                    timeZone: "Asia/Jakarta",
                }).format(new Date(data.created_at))

            } catch (e) {
                console.error(e)
            }
        })
    }

    async function updateToDo() {

        const itask = document.getElementById('task') as HTMLInputElement
        const task = itask.value
        const istatus = document.getElementById('status') as HTMLSelectElement
        const status = istatus.value
        const iidTodo = document.getElementById('idTodo') as HTMLInputElement
        const idTodo = iidTodo.value

        console.log(task)
        console.log(status)
        console.log(idTodo)


        updateEditedToDo({
            task: task,
            status: status
        }, Number(idTodo)).then((resp) => {
            console.log(resp)
            fetchData().then(data => setTodoData(data.data));
        })
    }

    async function handleStatusFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const filter = event.target.value
        console.log(filter)
        fetchDataFilter(filter).then(data => setTodoData(data.data))
    }

    function hapus() {
        const iidTodo = document.getElementById('hapusIdTodo') as HTMLInputElement
        console.log(iidTodo.value)
        deleteTodo(Number(iidTodo.value)).then(res => {
            console.log(res)
            fetchData().then(data => setTodoData(data.data));  
        })

    }

    function handleHapusToDo(id: string) {
        console.log(id)
        const iidTodo = document.getElementById('hapusIdTodo') as HTMLInputElement
        iidTodo.value = id
    }

    // function updateTodo() {
    // }

    return (
        <div className="w-full">
            <div className="max-w-screen">
                <div className="flex justify-between mb-2">
                    <div className="grid grid-cols-2 align-bottom">
                        <div className="text-2xl font-extrabold align-text-bottom">Todo</div>
                        <div>
                            <label>Filter Status</label>
                            <select defaultValue="all" className="input input-sm" onChange={handleStatusFilterChange}>
                                <option value="all">Semua</option>
                                <option value="belum selesai">Belum Selesai</option>
                                <option value="selesai">Selesai</option>
                            </select>

                        </div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => (document.getElementById("my_modal_add") as HTMLDialogElement).showModal()}>Tambah TODO</button>
                </div>
                <div className="">
                    <div className="overflow-x-auto rounded-box shadow-xl/10 border border-base-content/5 bg-base-100">
                        <table className="table table-zebra overflow-x-auto">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Task</th>
                                    <th>Tanggal dibuat</th>
                                    <th>Status</th>
                                    <th style={{ width: '12px' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todoData.length ? (todoData?.map((dt) => (
                                        <tr key={dt.id}>
                                            <td>{dt.id}</td>
                                            <td>{dt.task}</td>
                                            <td>{new Intl.DateTimeFormat("id-ID", {
                                                dateStyle: "full",
                                                timeZone: "Asia/Jakarta",
                                            }).format(new Date(dt.created_at))}</td>
                                            <td>{Number(dt.status) ? (<div className="badge badge-primary">Selesai</div>) : (<div className="badge badge-secondary badge-outline">Belum Selesai</div>)}</td>
                                            <td className="gap-2 flex justify-between">
                                                <button className="btn btn-sm btn-primary"
                                                    onClick={async () => {
                                                        await handleEditToDo(Number(dt.id));
                                                        (document.getElementById("my_modal_edit") as HTMLDialogElement).showModal()
                                                    }}
                                                >Ubah</button>


                                                <button className="btn btn-sm btn-warning"
                                                    onClick={async () => {
                                                        await handleViewToDo(Number(dt.id));
                                                        (document.getElementById("my_modal_view") as HTMLDialogElement).showModal()
                                                    }}
                                                >View</button>
                                                <button className="btn btn-sm btn-secondary"
                                                    onClick={async () => {
                                                        handleHapusToDo(dt.id);
                                                        (document.getElementById("hapus_modal") as HTMLDialogElement).showModal()
                                                    }}
                                                >Hapus</button>
                                            </td>
                                        </tr>
                                    ))) : (
                                        <tr>
                                            <td colSpan={5} className="text-center bg-base-200">
                                                <div className="mb-3">Belum Ada TODO</div> <button className="btn btn-primary btn-sm" onClick={() => (document.getElementById("my_modal_add") as HTMLDialogElement).showModal()}>Tambah TODO</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <dialog id="my_modal_add" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Tambah TODO</h3>

                        <div>
                            <fieldset className="fieldset">
                                {/* <legend className="fieldset-legend">Register</legend> */}

                                <label className="label">Task</label>
                                <input type="text" required className="input w-full" name="task" placeholder="task" onChange={handleChange} />

                                <label className="label">Status</label>
                                <select value={values["status"]} onChange={handleSelectChange} className="input w-full" name="status">
                                    <option value="0">Belum selesai</option>
                                    <option value="1">selesai</option>
                                </select>

                            </fieldset>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-neutral mr-2" onClick={() => saveToDo()}>Simpan</button>
                                <button className="btn btn-secondary">Tutup</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="my_modal_edit" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Ubah Todo</h3>
                        <fieldset className="fieldset">
                            {/* <legend className="fieldset-legend">Register</legend> */}

                            <label className="label">Task</label>
                            <input type="text" id="task" required className="input w-full" name="task" placeholder="task" />

                            <label className="label">Status</label>
                            <select id="status" className="input w-full" name="status">
                                <option value="0">Belum selesai</option>
                                <option value="1">selesai</option>
                            </select>
                            <input type="hidden" id="idTodo" />
                        </fieldset>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-neutral mr-2" onClick={() => updateToDo()}>Simpan</button>
                                <button className="btn btn-secondary">Tutup</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="my_modal_view" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">View TODO</h3>

                        <div>
                            <fieldset className="fieldset">
                                {/* <legend className="fieldset-legend">Register</legend> */}

                                <label className="label">Task</label>
                                <input type="text" id="view_task" required className="input w-full input-ghost" name="task" placeholder="task" />

                                <label className="label">Status</label>
                                <input type="text" id="view_status" required className="input w-full input-ghost" name="task" placeholder="task" />

                                <label className="label">Dibuat tanggal</label>
                                <input type="text" id="view_created_at" required className="input w-full input-ghost" name="task" placeholder="tanggal dibuat" />

                            </fieldset>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-secondary">Tutup</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <dialog id="hapus_modal" className="modal">
                    <div className="modal-box bg-primary text-primary-content">
                        <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
                        <p className="py-4">Anda Ingin Menghapus data ini</p>

                        <div className="modal-action">
                            <form method="dialog">
                                <input type="hidden" id="hapusIdTodo" />
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-primary mr-2" onClick={hapus}>Ya</button>
                                <button className="btn btn-secondary">Tidak</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default Todos


