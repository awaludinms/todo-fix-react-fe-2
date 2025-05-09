export default async function getForecast() {
    const response = await fetch(process.env.FORECAST_API + "/forecast?access_key=" + process.env.FORECAST_API_ACCESS_KEY + "&query=Yogyakarta", {
        method: "GET",
    })

    if (response.ok) {
        return response.json()
    }
}