import SendIcon from "../../../svg/Send.js";
import EmojiPicker from "./EmojiPicker";
import Input from "./Input.jsx";
import Attachments from "./attachments/Attachments.jsx";

export default function ChatActions() {
  return (
    <form
        //onSubmit={(e) => SendMessageHandler(e)}
        className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 px-4 select-none"
    >

        {/*Container*/}
        <div className="w-full flex items-center gap-x-2">
            {/*emojis and attachment*/}
            <ul className="flex gap-x-2">
                <EmojiPicker />
                <Attachments />
            </ul>
            {/* input */}
            <Input />

            {/* send botton */}
            <button className="btn">
                <SendIcon className="dark:fill-dark_svg_1" />
            </button>
        </div>
    </form>
  )
}
