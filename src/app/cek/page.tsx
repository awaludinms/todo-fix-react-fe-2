import { cookies } from "next/headers"

export default async function Cek() {
    
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    console.log(token?.value)
    return (<>
        {token?.value}
    </>)
}