import ChatHeader from "./header/ChatHeader";

export default function ChatContainer() {
    
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
        {/* container */}
        <div>
            <ChatHeader />
        </div>
    </div>
  )
}
