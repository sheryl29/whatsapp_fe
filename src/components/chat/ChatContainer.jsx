import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { ChatActions } from "./actions";
import { getConversationMessages } from "../../features/chatSlice";
import { checkOnlineStatus, getConversationId } from "../../utils/chat";
import FilesPreview from "./preview/FilesPreview";

export default function ChatContainer({onlineUsers, typing, callUser}) {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
        {/* container */}
        <div>
            {/* chat message */}
            <ChatHeader 
              online={ 
                activeConversation.isGroup 
                ? false 
                : checkOnlineStatus(onlineUsers, user, activeConversation.users)
                 } 
                callUser={callUser}/>
          {
            files.length > 0 ? (
              <FilesPreview /> 
            ):(
              <>
              {/* chat message */}
              <ChatMessages typing={typing}/>

              {/* chat actions */}
              <ChatActions />
              </>
            )
          }
        </div>
    </div>
  )
}
