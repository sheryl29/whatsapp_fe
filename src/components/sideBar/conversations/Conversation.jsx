import { open_create_conversation } from "../../../features/chatSlice"
import { getConversationId, getConversationName, getConversationPicture } from "../../../utils/chat";
import { dateHandler } from "../../../utils/date"
import { useDispatch, useSelector } from "react-redux"
import { capitalize } from "../../../utils/string";
import { useState } from "react";
import SocketContext from "../../../context/SocketContext";

function Conversation({convo, socket, online, typing}) {
    const dispatch=useDispatch();
    const {user} = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);
    const {token} = user;

    const values={
        receiver_id: getConversationId(user, convo.users),
        isGroup: convo.isGroup ? convo._id : false,
        token,
    };
    const openConversation = async()=>{
        let newConvo = await dispatch(open_create_conversation(values))
        socket.emit("join conversation", newConvo.payload._id);
    }
  return (
    <li
    onClick={() => openConversation()}
    className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
      convo._id !== activeConversation._id ? "dark:bg-dark_bg_2" : ""
    } cursor-pointer dark:text-dark_text_1 px-[10px] ${
      convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""
    }`}
  >
        {/* container */}
        <div className="relative w-full flex items-center justify-between py-[10px]">
            {/* left */}
            <div className="flex items-center gap-x-3">
                {/* conversation user pic */}
                <div
                    className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
                    online ? "online" : ""}`}
                >
                    <img
                        src={
                            convo.isGroup
                            ? convo.picture
                            : getConversationPicture(user, convo.users)
                        }
                        alt="picture"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* conversation name and message */}
                <div className="w-full flex flex-col">
                    {/* conversation name */}
                    <h1 className="font-bold flex items-center gap-x-2">
                        {convo.isGroup
                        ? convo.name
                        : capitalize(getConversationName(user, convo.users))}
                    </h1>
                    {/* conversation message */}
                    <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                        <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                        {
                            typing === convo._id ? (
                                <p className="text-green_1">Typing...</p>
                            ):(
                                //if the latestMessage more than 25 then only display 0-25
                                <p>
                                {convo.latestMessage?.message.length > 25
                                ? `${convo.latestMessage?.message.substring(0,25)}...`
                                : convo.latestMessage?.message} 
                            </p>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
            {/* right */}
            <div className="flex flex-col gap-y-4 items-end text-xs">
                <span className="dark:text-dark_text_2">
                    {convo.latestMessage?.createdAt 
                    ? dateHandler(convo.latestMessage?.createdAt)
                    : ""}
                </span>
            </div>
        </div>
        {/* border */}
        <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  )
}

const ConversationWithContext = (props) => (
    <SocketContext.Consumer>
      {(socket) => <Conversation {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
  
  export default ConversationWithContext;