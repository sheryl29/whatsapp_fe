import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sideBar";
import { getConversations } from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  
  console.log("activeConversation", activeConversation);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex">
        {/*Sidebar*/}
        <Sidebar />
        { activeConversation._id ? <ChatContainer /> : <WhatsappHome /> }
        
      </div>
    </div>
  );
}
