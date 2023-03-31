



export const fetchMineCraftUser = async (username: string) => {
    try {
        return await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.mojang.com/users/profiles/minecraft/${username}`
        )
            .then((d) => d.json())
            .then((d) => {
                if (d?.errorMessage) throw d
                return d
            })

    } catch (e) {
        console.error("API CALLING fetchMineCraftUser ERROR", e)
        throw e
    }


}