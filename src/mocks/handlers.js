import { rest } from "msw";
import { baseURL } from "../api/axiosDefaults";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json(
            {
                "pk": 1,
                "username": "admin",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 1,
                "profile_image": "https://res.cloudinary.com/dwhsm0rqr/image/upload/v1/sudoku_media/images/legoman_hvmw5g"
            }
        ))
    }), 

    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
]