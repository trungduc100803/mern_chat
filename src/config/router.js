import routes from "../routers/index"

import CenterLayout from "../layouts/CenterLayout"
import ChatLayout from "../layouts/ChatLayout"

import HomeChat from "../pages/HomeChat/HomeChat"
import Login from "../pages/login/Login"

const publicRoute = [
    { path: routes.home, page: HomeChat, layout: ChatLayout },
    { path: routes.login, page: Login, layout: CenterLayout }
]


export default publicRoute