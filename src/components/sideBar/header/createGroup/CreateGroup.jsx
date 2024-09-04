import { useState } from "react";
import { ReturnIcon } from "../../../../svg";
import UnderlineInput from "./UnderlineInput";

export default function CreateGroup() {
    const [name, setName] = useState("");
  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
        {/* container */}
        <div className="mt-5">
            {/* return/close button */}
            <button className="btn w-6 h-6 border">
                <ReturnIcon className="fill-white"/>
            </button>
            {/* group name input */}
            <UnderlineInput name={name} setName={setName}/>
        </div>
    </div>
  )
}
