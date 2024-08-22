import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notification } from "./notifications";
import { Search } from "./search";
import { Conversations } from "./conversations";
import { SearchResult } from "./search";

export default function Sidebar() {

  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);

  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
        {/* sidebar header */}
        <SidebarHeader />
        
        {/* notifications */}
        <Notification />

        {/* search */}
        <Search 
          searchLength={searchResults.length}
          setSearchResults={setSearchResults}
        />

        {searchResults.length > 0 ?(
          <>
            {/*search result*/}
            <SearchResult 
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </>
        ) : (
          <>
            {/* conversations */}
            <Conversations />
          </>
        )}

        
    </div>
  )
}
