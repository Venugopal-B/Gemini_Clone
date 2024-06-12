import React, { useContext, useState } from "react";
import "./Sidebar.css";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Chat from '@mui/icons-material/ChatBubbleOutline';
import HelpIcon from '@mui/icons-material/HelpOutline';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { Context } from "../../context/Context";
const Sidebar = () => {

    const [extended, setextended] = useState(false)
    const {onSent,prevPrompts,setrecentprompt,newChat} = useContext(Context)

    const loadprompt = async (prompt) => {
        setrecentprompt(prompt)
        await onSent(prompt)
    }
    return (
        <div className="sidebar">
            <div className="top">
                <MenuIcon onClick={() => setextended(prev => !prev)} className="menu img" />
                <div onClick={()=>newChat()} className="new-chat">
                    <AddIcon className="img" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? <div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompts.map((item, index) => {
                        return (
                            <div onClick={() => loadprompt(item)
                            } className="recent-entry">
                                <Chat className="img" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        )
                    })}

                </div> : null}

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <HelpIcon className="img" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <RestoreIcon className="img" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <SettingsIcon className="img" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;