import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { ChatActions } from "./actions";
import { getConversationMessages } from "../../features/chatSlice";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
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
            <ChatHeader />

            {/* chat message */}
            <ChatMessages />

            {/* chat actions */}
            <ChatActions />
        </div>
    </div>
  )
}
