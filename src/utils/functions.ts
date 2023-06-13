import { baseUrl } from "lib/api"
export const getWebsitesforSingleUser = async (id: string) => {
    // GETS ALL THE WEBSITES ATTACHED TO A USER
    try {
        const res = await fetch(`${baseUrl}/company?userId=${id}`, {method: "GET"})
        const resData = await res.json()

        if(res && resData) return resData
    } catch (error) {
        console.log(error)
        return null
    }


}

export const getSpecificWebsite = async (id: string) => {
    // GETS A SPECIFIC WEBSITE INFORMATION WITH PASSING THE ID
    try {
        const res = await fetch(`${baseUrl}/company?companyId=${id}`, {method: "GET"})
        const resData = await res.json()
        if (res&& resData) return resData
        
    } catch (error) {
        console.log(error)
        return null
        
    }


}

export const editSpecificWebsite = async (id: string, body: Object) => {
    // EDIT A SPECIFIC WEBSITE INFORMATION WITH PASSING THE ID
    try {
        const res = await fetch(`${baseUrl}/company?companyId=${id}`, {method: "PUT",    headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(body)})
        const resData = await res.json()

        if (res && resData) return resData
        
    } catch (error) {
        console.log(error)
        return null
        
    }
}


export const createNewWebsite = async (id: string, body: {name: string, icon: string, website: string, userId: string | number}) => {
    // EDIT A SPECIFIC WEBSITE INFORMATION WITH PASSING THE ID
    try {
        const res = await fetch(`${baseUrl}/company?companyId=${id}`, {method: "POST",    headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(body)})
        const resData = await res.json()

        if (res && resData) return resData
        
    } catch (error) {
        console.log(error)
        return null
    }
}


