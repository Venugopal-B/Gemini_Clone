import React, { useContext } from "react";
import "./Main.css"
import Account from '@mui/icons-material/AccountCircle';
import Explore from '@mui/icons-material/ExploreOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import MicIcon from '@mui/icons-material/MicNoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../context/Context";
import {assets} from "../../assets/assets"
const Main=()=>{

    const {onSent,recentprompt,showResult,loading,resultdata,setinput,input}=useContext(Context);
    return(
        <div className="main">
          <div className="nav">
            <p>Gemini</p>
            <Account className="img"/>
          </div>
          <div className="main-container">
            {!showResult?
            <>
            <div className="greet">
                <p><span>Hello, Venugopal</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on upcoming Road trip</p>
                    <Explore className="img" fontSize="small"/>
                </div>
                <div className="card">
                    <p>Explain the key rules of rugby. Start with the basics and go step-by-step.</p>
                    <LightbulbOutlinedIcon className="img"/>
                </div>
                <div className="card">
                    <p>Create a 12-week study plan for learning a new language: Italian</p>
                    <DrawOutlinedIcon className="img"/>
                </div>
                <div className="card">
                    <p>How long does it take to walk from Buckingham Palace to Big Ben in London?</p>
                    <RoomOutlinedIcon className="img" />
                </div>
            </div>
            </>:<div className="result">
                <div className="result-title">
                <Account className="img"/>
                <p>{recentprompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading?
                    <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>:<p dangerouslySetInnerHTML={{__html:resultdata}}></p> }
                    
                </div>
                
                </div>}
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setinput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here"/>
                    <div>
                <AddPhotoIcon className="img"/>
                <MicIcon className="img" />
                {input?<SendIcon onClick={()=>onSent()}className="img"/>:null}

                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info,inlcuding about people,so double-check its responses.Your privacy and Gemini Apps
                </p>
            </div>
          </div>
        </div>
    )
}
export default Main;