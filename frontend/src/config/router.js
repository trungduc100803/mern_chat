import routes from "../routers/index"

import CenterLayout from "../layouts/CenterLayout"
import ChatLayout from "../layouts/ChatLayout"

import HomeChat from "../pages/HomeChat/HomeChat"
import Login from "../pages/login/Login"
import Discovery from "../pages/Discovery/Discovery"
import RequestAddFriend from "../pages/RequestAddFriend/RequestAddFriend"
import Me from "../pages/Me/Me"
import AllFriend from "../pages/AllFriend/AllFriend"


const publicRoute = [
    { path: routes.home, page: HomeChat, layout: ChatLayout },
    { path: routes.login, page: Login, layout: CenterLayout },
    { path: routes.decovery, page: Discovery, layout: CenterLayout },
    { path: routes.addFriend, page: RequestAddFriend, layout: CenterLayout },
    { path: routes.allFriend, page: AllFriend, layout: CenterLayout },
    { path: routes.profile, page: RequestAddFriend, layout: CenterLayout },
    { path: routes.me, page: Me, layout: CenterLayout },
]


export default publicRoute