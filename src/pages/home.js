
import { useDispatch,useSelector } from "react-redux"
import { Sidebar } from "../components/sideBar"
import { useEffect } from "react";
import { getConversations } from "../features/chatSlice";

export default function Home() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  //get conversations
  useEffect(() => {
    if(user?.token){
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* container */}
      
      <div className="container h-screen flex py-[19px]">

        <Sidebar />

      </div>


    </div>
  )
}
