import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";



function ChatList() {
  const{getMyChatPartners,isUserLoading,chats,setSelctedUser}=useChatStore();

  useEffect(() => {
    getMyChatPartners()

  }, [getMyChatPartners]);

  if(isUserLoading){
    return <UsersLoadingSkeleton/>
  }

  if(chats.length === 0){
    return <NoChatsFound/>
  }
  


  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelctedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* todo: here we use the socket and fix online status */}
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ChatList
