import axios from "axios"




export const fetchMineCraftUser = async (username: string) =>
    axios.get(
        `/api?endpoint=https://api.mojang.com/users/profiles/minecraft/${username}`
    ).then(({ data }) => data)


