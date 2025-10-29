export async function $fetch(route, {method="GET", body={}}={}) {
    let headers = {}

    const token = localStorage.getItem("token")

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    const url = new URL("http://localhost:8000/" + route)

    if (method === "GET") {
        url.search = new URLSearchParams(body)
        body = null
    }

    const response = await fetch(url, {
        headers,
        method,
        body
    })

    let json = {}
    
    try {
        json = await response.json()
    } catch {
        json = null
    }

    return {
        json, response
    }
}