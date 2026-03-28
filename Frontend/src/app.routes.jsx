import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/Posts/pages/Feed"
import CreatePost from "./features/Posts/pages/CreatePost"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/feed',
        element: <Feed />
    },
    {
        path: "/create-post",
        element: <CreatePost />
    }
])