import jwtDecode from "jwt-decode"
import { axiosReq } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult =>
                    accResult.id === cur.id) ? acc : [...acc, cur]
            }, prevResource.results)
        }))
    } catch (err) {
        console.log(err);
    }
}


export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
}

export const shouldRefreshToken = () => {
    const shouldRefresh = !!localStorage.getItem('refreshTokenTimestamp');
    console.log(`shouldRefresh: ${shouldRefresh}`)
    return shouldRefresh;
}

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp');
}