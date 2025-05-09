import Image from "next/image";

export default async function ImageForecast({img}:{img: string}) {
    return (<>
        <Image alt="" width={500}
            height={500} src={img} />
    </>)

}
