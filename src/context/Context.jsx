import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {


    const [input, setinput] = useState("");
    const [recentprompt, setrecentprompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setShowresult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultdata, setResultdata] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultdata(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat=()=>{
        setloading(false)
        setShowresult(false)
    }

    const onSent = async (prompt) => {

        setResultdata("")
        setloading(true)
        setShowresult(true)
        let response;
        if(prompt!==undefined){
            response=await runChat(prompt);
            setrecentprompt(prompt)
        }else{
            setprevPrompts(prev=>[...prev,input])
            setrecentprompt(input)
            response=await runChat(input)
        }
        
        let responseArray = response.split("**");
        let newresponse="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newresponse += responseArray[i];
            } else {
                newresponse += "<b>" + responseArray[i] + "</b>";
            }

        }
        let newresponse2 = newresponse.split("*").join("</br>");
        let newresponseArray=newresponse2.split(" ");
        for(let i=0;i<newresponseArray.length;i++){
            const nextWord=newresponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setloading(false)
        setinput("");

    }


    const contextValue = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setrecentprompt,
        recentprompt,
        showResult,
        loading,
        resultdata,
        input,
        setinput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>
    )
}
export default ContextProvider;