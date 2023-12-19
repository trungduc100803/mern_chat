import './ChatLayout.scss'
import SideBar from "../components/SideBar/SideBar";

function ChatLayout({ children }) {
    return <div className="ChatLayout">
        <div className="chat_sidebar_layout">
            <SideBar />
        </div>
        <div className="chat_children_layout">
            {children}
        </div>
    </div>
}

export default ChatLayout;