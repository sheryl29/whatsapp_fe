import { SidebarHeader } from "./header";
import { Notification } from "./notifications";

export default function Sidebar() {
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
        {/* sidebar header */}
        <SidebarHeader />
        
        {/* notifications */}
        <Notification />
        
    </div>
  )
}
