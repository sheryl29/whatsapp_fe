import { useState,useRef } from "react";
import SendIcon from "../../../svg/Send.js";
import EmojiPickerApp from "./EmojiPicker";
import Input from "./Input.jsx";
import Attachments from "./attachments/Attachments.jsx";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice.js";

export default function ChatActions() {
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments,setShowAttachments] = useState(false);
    const [loading, setLoading] = useState(false);
    const { activeConversation, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const textRef = useRef();
    const [message, setMessage] = useState("");
    const values = {
        message,
        convo_id: activeConversation._id,
        files: [],
        token,
    };
    const SendMessageHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(sendMessage(values));
        setMessage("");
        setLoading(false);
    };

  return (
    <form
        onSubmit={(e) => SendMessageHandler(e)}
        className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 px-4 select-none"
    >

        {/*Container*/}
        <div className="w-full flex items-center gap-x-2">
            {/*emojis and attachment*/}
            <ul className="flex gap-x-2">
                <EmojiPickerApp 
                    message={message} 
                    setMessage={setMessage} 
                    textRef={textRef}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    setShowAttachments={setShowAttachments}
                    />
                <Attachments 
                    showAttachments={showAttachments}
                    setShowAttachments={setShowAttachments}
                    setShowPicker={setShowPicker}
                />
            </ul>
            {/* input */}
            <Input message={message} setMessage={setMessage} textRef={textRef}/>

            {/* send botton */}
            <button type="submit" className="btn">
                { status === "loading" && loading ? (
                    <ClipLoader color="E9EDEF" size={25} />
                ) : (
                    <SendIcon className="dark:fill-dark_svg_1" />
                )}
            </button>
        </div>
    </form>
  )
}
