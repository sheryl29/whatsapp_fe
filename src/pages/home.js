import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sideBar";
import { getConversations } from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/chat";
import { updateMessagesAndConversations } from "../features/chatSlice";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";

const callData = {
  receivingCall: false,
  callEnded: false,
};

function Home({socket}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  //typing
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //call
  const [call, setCall] = useState(callData);
  const {receivingCall, callEnded} = call;
  const [callAccepted, setCallAccepted] = useState(false);

  //join user into the socket
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users) => {
      console.log("online users", users);
      setOnlineUsers(users);
    });
  }, [user]);

  //get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  useEffect(() => {
    //lsitening to receiving a message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex py-[19px]">
          {/*Sidebar*/}
          <Sidebar onlineUsers={onlineUsers} typing={typing}/>
          { activeConversation._id ? <ChatContainer onlineUsers={onlineUsers} typing={typing} /> : <WhatsappHome /> }
        </div>
      </div>
      {/* call */}
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
      />
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;